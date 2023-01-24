import React, {Component} from "react";
import ProblemForm from "./ProblemForm";

class ProblemInfo extends Component {
    state = {
        edit: false,
    }

    onRemove = () => {
        const {info, onRemove} = this.props;
        onRemove(info.id);
    }

    onEdit = () => {
        const {edit} = this.state;
        this.setState({
            edit: !edit,
        });
    }

    onChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            this.setState({
                [name]: e.target.checked,
            })
        } else {
            this.setState({
                [name]: value
            })
        }
    }

    onCheckChange = (e) => {
        const {answerList, id, value} = e.target;
        answerList[Number(id)] = value;
        this.setState({
            answerList: answerList
        })
    }

    getItems = () => {
        const list = [];
        for (let i = 0; i<this.state.answerCount; i++) {
            list.push(
                <div>
                    <label form={"check" + i}>
                        <input
                            id={"check" + i}
                            type={"checkbox"}
                            name={"answer"}
                            value={i.toString()}
                            onChange={this.onChange}/>
                        {ProblemForm.numberList[i].name}
                    </label>
                    <input
                        id={i.toString()}
                        name={"answerInput"}
                        value={this.state.answerList[i]}
                        onChange={this.onCheckChange}/>
                    <br/>
                </div>
            );
        }
        return list;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { info, onUpdate } = this.props;
        if (!prevState.edit && this.state.edit) {
            this.setState({
                number: info.number,
                title: info.title,
                score: info.score,
                answerCount: info.answerCount,
                answer: info.answer,
                answerList: info.answerList
            });
        }

        if (prevState.edit && !this.state.edit) {
            const checkList = [];
            info.answer.forEach((i) => {
                if (i.checked) checkList.push(Number(i.value));
            })

            onUpdate(info.id, {
                number: this.state.number,
                title: this.state.title,
                score: this.state.score,
                answerCount: this.state.answerCount,
                answer: checkList,
                answerList: this.state.answerList
            });
        }
    }

    render() {
        const {edit} = this.state;

        if (edit) {
            return (
                <div>
                    <table>
                        <tr>
                            <td>문제 번호</td>
                            <td>
                                <input
                                    placeholder={"number"}
                                    value={this.state.number}
                                    onChange={this.onChange}
                                    name={"number"}/>
                            </td>
                        </tr>
                        <tr>
                            <td>문제 설명</td>
                            <td>
                                <input
                                    placeholder={"title"}
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    name={"title"}/>
                            </td>
                        </tr>
                        <tr>
                            <td>문제 점수</td>
                            <td>
                                <input
                                    placeholder={"점수"}
                                    value={this.state.score}
                                    onChange={this.onChange}
                                    name={"score"}
                                    type={"number"}
                                    min={0}/>
                            </td>
                        </tr>
                        <tr>
                            <td>정답 갯수</td>
                            <td>
                                <input
                                    placeholder={"정답"}
                                    value={this.state.answerCount}
                                    onChange={this.onChange}
                                    name={"answerCount"}
                                    type={"number"}
                                    min={2} max={20}/>
                            </td>
                        </tr>
                    </table>
                    {this.getItems()}
                    <button onClick={this.onEdit}>수정</button>
                </div>
            )
        } else {
            const {number, title, score, answer, answerList} = this.props.info;
            const answers = [];
            for (let i = 0; i<answerList.length; i++) {
                if (answer.includes(i)) {
                    answers.push(<div>{ProblemForm.numberList[i].isName}{answerList[i]}</div>);
                } else answers.push(<div>{ProblemForm.numberList[i].name}{answerList[i]}</div>);
            }

            return (
                <div>
                    <b>{number}.</b> {title}
                    <div>({score}점)</div>
                    {answers}
                    <button onClick={this.onEdit}>수정</button>
                    <button onClick={this.onRemove}>삭제</button>
                </div>
            )
        }

        // if (edit) {
        //     // 수정 화면
        //     return (
        //         <div>
        //             <table>
        //                 <tr>
        //                     <td>문제 번호</td>
        //                     <td>
        //                         <input
        //                             placeholder={"number"}
        //                             value={this.state.number}
        //                             onChange={this.onChange}
        //                             name={"number"}/>
        //                     </td>
        //                 </tr>
        //                 <tr>
        //                     <td>문제 설명</td>
        //                     <td>
        //                         <input
        //                             placeholder={"title"}
        //                             value={this.state.title}
        //                             onChange={this.onChange}
        //                             name={"title"}/>
        //                     </td>
        //                 </tr>
        //                 <tr>
        //                     <td>문제 점수</td>
        //                     <td>
        //                         <input
        //                             placeholder={"점수"}
        //                             value={this.state.score}
        //                             onChange={this.onChange}
        //                             name={"score"}
        //                             type={"number"}
        //                             min={0}/>
        //                     </td>
        //                 </tr>
        //                 <tr>
        //                     <td>정답 갯수</td>
        //                     <td>
        //                         <input
        //                             placeholder={"정답"}
        //                             value={this.state.answerCount}
        //                             onChange={this.onChange}
        //                             name={"answerCount"}
        //                             type={"number"}
        //                             min={2} max={20}/>
        //                     </td>
        //                 </tr>
        //             </table>
        //             {this.getItems}
        //             <button onClick={this.onEdit}>수정</button>
        //         </div>
        //     )
        // } else {
        //     const {number, title, score, answer, answerList} = this.props.info;
        //
        //     const answers = [];
        //     for (let i = 0; i<answerList.length; i++) {
        //         if (answer.includes(i)) {
        //             answers.push(<div>{ProblemForm.numberList[i].isName}{answerList[i]}</div>);
        //         } else answers.push(<div>{ProblemForm.numberList[i].name}{answerList[i]}</div>);
        //     }
        //
        //     // 수정전 화면
        //     return (
        //         <div>
        //             <b>{number}.</b> {title}
        //             <div>({score}점)</div>
        //             {answers}
        //             <button onClick={this.onEdit}>수정</button>
        //             <button onClick={this.onRemove}>삭제</button>
        //         </div>
        //     )
        // }
    }
}

export default ProblemInfo;