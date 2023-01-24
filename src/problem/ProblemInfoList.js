import React, {Component} from "react";
import ProblemInfo from "./ProblemInfo";

class ProblemInfoList extends Component {
    static defaultProps = {
        list: [],
    }

    render() {
        const { data, onRemove, onUpdate } = this.props;
        const list = data.map(info => (
            <ProblemInfo
                key={info.id}
                info={info}
                onRemove={onRemove}
                onUpdate={onUpdate}
            />)
        );

        return (
            <div>{list}</div>
        )
    }
}

export default ProblemInfoList;