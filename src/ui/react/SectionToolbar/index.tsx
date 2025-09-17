import '../../../styles/index.css'
import {BreaseEditButton} from "./SectionEditButton";

export function SectionToolbar({data}:{data:any}) {
    return <div className={'brease-section-toolbar'}>
        <div>
            <span className={'brease-section-title'}>{data.name}</span>
        </div>
        <div className={'brease-toolbar-actions'}>
            <BreaseEditButton id={data.page_section_uuid}/>
        </div>
    </div>
}

export default SectionToolbar;
