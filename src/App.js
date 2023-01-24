import {Component, useCallback, useEffect, useRef, useState} from "react";
import './App.css';
import ProblemForm from "./problem/ProblemForm";
import ProblemInfoList from "./problem/ProblemInfoList";

class App extends Component {
    state = {
        information: []
    }

    id = 0;
    onCreate = (data) => {
        const {information} = this.state;
        this.setState({
            information: information.concat( {id: this.id++, ...data} )
        })
    }

    onSizeCreate = () => {
        const {information} = this.state;
        return information.length;
    }

    onRemove = (id) => {
        const {information} = this.state;
        this.setState({
            information: information.filter(info => info.id !== id)
        })
    }

    onUpdate = (id, data) => {
        const { information } = this.state;
        this.setState({
            information: information.map(
                info => id === info.id
                    ? {...info, ...data}
                    : info
            )
        })
    }

    render() {
        const { information } = this.state;
        return (
            <div>
                <ProblemForm data={information} onCreate={this.onCreate} onSizeCreate={this.onSizeCreate}/>
                <ProblemInfoList data={information} onRemove={this.onRemove} onUpdate={this.onUpdate}/>
            </div>
        );
    }
}

export default App;
