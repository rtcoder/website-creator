import React, {FormEvent} from "react";
import {fetchJson} from "@/helpers/fetch";
import styles from "./IconsList.module.scss";
import Icon from "@/components/Icon";
import classNames from "@/helpers/classNames";

interface IconsListInterface {
    categories: {
        name: string;
        title: string
    }[];
    icons: {
        name: string;
        icon: string;
        categories: string[]
    }
}

interface IconsListPropsInterface {
    type: string;
    selectedIcon: {
        name: string;
    } | null;
    onSelectIcon: (icon: { type: string; name: string } | null) => void;
}

export default class IconsList extends React.Component<any, any> {
    protected constructor(private props: IconsListPropsInterface) {
        super(props);
        this.state = {
            icons: [],
            iconsToShow: [],
            categories: [],
            page: 1,
            perPage: 100,
            iconsType: props.type,
            searchInputRef: React.createRef(),
            categoriesSelectRef: React.createRef(),
            iconsContainerRef: React.createRef(),
            displayShowMoreButton: true,
            selectedIcon: props.selectedIcon
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedIcon?.name !== this.props.selectedIcon?.name) {
            this.setState({
                selectedIcon: this.props.selectedIcon
            });
        }
    }

    componentDidMount() {
        this.getIconsList()
            .then(({icons, categories}) => {
                this.setState({
                    icons,
                    categories
                }, () => {
                    this.searchIcons()
                });
            });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.iconsToShow !== this.state.iconsToShow
            || nextState.selectedIcon?.name !== this.state.selectedIcon?.name
            || nextProps.selectedIcon?.name !== this.state.selectedIcon?.name;
    }

    private async getIconsList(): Promise<IconsListInterface> {
        return fetchJson<IconsListInterface>(`/json/icons/${this.state.iconsType}.json`);
    }

    private searchIcons(ev?: FormEvent, page = 1) {
        ev?.preventDefault();
        ev?.stopPropagation();
        this.setState({page});
        const {
            perPage,
            searchInputRef,
            categoriesSelectRef,
            icons,
            iconsContainerRef
        } = this.state;

        const category = categoriesSelectRef.current.value;
        const search = searchInputRef.current.value;
        const foundAllIcons = icons
            .filter(icon => icon.icon.startsWith(search) || icon.name.startsWith(search))
            .filter(({categories}) => category ? categories.includes(category) : true);

        const foundIcons = foundAllIcons
            .slice(0, (page * perPage));

        if (page === 1) {
            iconsContainerRef.current.scroll({behavior: 'smooth', top: 0});
        }

        this.setState({
            page,
            iconsToShow: foundIcons,
            displayShowMoreButton: foundAllIcons.length - foundIcons.length > 0
        });
    }

    private loadNextPage(ev) {
        this.searchIcons(ev, this.state.page + 1);
    }

    private toggleSelected(icon) {
        if (this.state.selectedIcon?.name === icon.icon) {
            this.setState({selectedIcon: null});
            this.props.onSelectIcon(null);
        } else {
            this.setState({selectedIcon: {name: icon.icon}});
            this.props.onSelectIcon({name: icon.icon, type: this.state.iconsType});
        }
    }

    render() {
        return (<>
            {this.state.selectedIcon?.name}
            <div className={styles.searchForm}>
                <input type="text"
                       ref={this.state.searchInputRef}
                       placeholder="Szukaj"
                       onInput={ev => this.searchIcons(ev)}/>

                <select ref={this.state.categoriesSelectRef}
                        onChange={ev => this.searchIcons(ev)}>
                    <option value="">Wybierz</option>
                    {this.state.categories.map(({name, title}) => <option key={name} value={name}>{title}</option>)}
                </select>
            </div>

            <div className={styles.iconsList} ref={this.state.iconsContainerRef}>

                <div className={styles.icons}>
                    {this.state.iconsToShow.map((icon, index) =>
                        <div key={icon.icon + index} className={classNames({
                            [styles.iconItem]: true,
                            [styles.selected]: this.state.selectedIcon?.name === icon.icon
                        })}
                             onClick={() => this.toggleSelected(icon)}>
                            <div className={styles.iconPreview}>
                                <Icon type={this.state.iconsType} name={icon.icon} className={styles.icon}/>
                            </div>
                            <div className={styles.iconName}>{icon.name}</div>
                        </div>)}
                </div>

                {this.state.displayShowMoreButton
                    ? <div className={styles.showMoreButton}
                           onClick={ev => this.loadNextPage(ev)}>
                        Pokaż więcej
                    </div> : ''}
            </div>
        </>)
    }
}
