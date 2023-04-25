import LayoutValues from "@/components/Creator/LeftPanel/StylesPanel/Layout/LayoutValues/LayoutValues";

interface Props {
    onChange: (value: string, property: string) => void
}

export default function (props: Props) {
    const flexDirectionValues = ['column', 'column-reverse', 'row', 'row-reverse'];
    const label = 'Kierunek ułożenia elementów';
    return (
        <LayoutValues subItemsCount={3} onChange={props.onChange} availableValues={flexDirectionValues} label={label}
                      propName="flexDirection"/>
    )
}
