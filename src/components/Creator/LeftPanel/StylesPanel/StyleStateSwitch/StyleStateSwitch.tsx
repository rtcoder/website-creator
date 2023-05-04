import {useDispatch, useSelector} from "react-redux";
import ButtonToggleGroup from "@/components/construction/ButtonToggleGroup/ButtonToggleGroup";
import ButtonToggle from "@/components/construction/ButtonToggleGroup/ButtonToggle/ButtonToggle";
import {useCallback} from "react";
import {setStyleState} from "@/store/structureSlice";
import {STYLE_STATE_NAMES} from "@/enums/styleState";

export default function () {
    const styleState = useSelector((state: any) => state.structure.styleState);
    const dispatch = useDispatch();

    const _setStyleState = useCallback((val) => {
        dispatch(setStyleState(val));
    }, [dispatch]);
    return (
        <div>
            <ButtonToggleGroup value={styleState} onChange={e => _setStyleState(e)} required={true}>
                <ButtonToggle value={STYLE_STATE_NAMES.BASIC}>Tryb podstawowy</ButtonToggle>
                <ButtonToggle value={STYLE_STATE_NAMES.HOVER}>Tryb hover</ButtonToggle>
            </ButtonToggleGroup>
        </div>
    )
}
