import {BreaseEditButton} from "./SectionEditButton";

export function SectionToolbar({data}:{data:any}) {
    return <div className={'brease-section-toolbar'}>
        <div>
            <span className={'brease-section-title'}>{data.name}</span>
        </div>
        <div className={'brease-toolbar-actions'}>
            <BreaseEditButton id={data.uuid}/>
        </div>
    </div>
}

export default SectionToolbar;
