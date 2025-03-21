import './style.css'
import {BreaseEditButton} from "./SectionEditButton";
export function SectionToolbar({data}) {
    return <div className={'BreaseSectionToolbar'}>
        <div className={''}>
            <span className={'BreaseSectionTitle'}>{data.name}</span>
        </div>
        <div className={'BreaseToolbarActions'}>
            <BreaseEditButton id={data.uuid}/>
        </div>
    </div>
}

