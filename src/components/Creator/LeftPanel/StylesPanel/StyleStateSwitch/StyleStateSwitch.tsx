import {useSelector} from "react-redux";

export default function () {
    const styleState = useSelector((state: any) => state.structure.styleState);
    return (
        <div>
            {styleState}
        </div>
    )
}
