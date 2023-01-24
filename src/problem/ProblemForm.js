import React, {Component} from "react";

class ProblemForm extends Component {
    static numberList = [
        {value: 1, name: "①", isName: "❶"}, {value: 2, name: "②", isName: "❷"}, {value: 3, name: "③", isName: "❸"},
        {value: 4, name: "④", isName: "❹"}, {value: 5, name: "⑤", isName: "❺"}, {value: 6, name: "⑥", isName: "❻"},
        {value: 7, name: "⑦", isName: "❼"}, {value: 8, name: "⑧", isName: "❽"}, {value: 9, name: "⑨", isName: "❾"},
        {value: 10, name: "⑩", isName: "❿"}, {value: 11, name: "⑪", isName: "⓫"}, {value: 12, name: "⑫", isName: "⓬"},
        {value: 13, name: "⑬", isName: "⓭"}, {value: 14, name: "⑭", isName: "⓮"}, {value: 15, name: "⑮", isName: "⓯"},
        {value: 16, name: "⑯", isName: "⓰"}, {value: 17, name: "⑰", isName: "⓱"}, {value: 18, name: "⑱", isName: "⓲"},
        {value: 19, name: "⑲", isName: "⓳"}, {value: 20, name: "⑳", isName: "⓴"},
    ];

    state = {
        number: '1',
        title: '',
        score: 1,
        answerCount: 5,
        numberAuto: true,
        answer: [],
        answerList: []
    }

    onCheckChange = (e) => {
        const list = this.state.answerList;
        list[Number(e.target.id)] = e.target.value;
        this.setState({
            answerList: list
        })
    }

    onChange = (e) => {
        const { type, name, value } = e.target;

        if (type === 'checkbox') {
            this.setState({
                [name]: e.target.checked
            })
        } else {
            this.setState({
                [name]: value
            })
        }
    }

    errorMessageList = [];
    onSubmit = (e) => {
        e.preventDefault();

        const checkList = [];
        e.target.answer.forEach((i) => {
            if (i.checked) checkList.push(Number(i.value));
        })

        // 리스트 크기 초기화
        this.errorMessageList.length = 0;
        if (e.target.number.value.toString().trim() === '') this.errorMessageList.push("문제 번호를 입력해주세요.");
        if (e.target.title.value.toString().trim() === '') this.errorMessageList.push("문제 설명을 입력해주세요.");
        if (e.target.score.value <= 0) this.errorMessageList.push("문제 점수가 0점 이하일 수 없습니다.");
        if (checkList.length === 0) this.errorMessageList.push("정답을 1개 이상 선택해주세요.");

        // 에러 메세지가 있다면 동작 끝내기
        if (this.errorMessageList.length !== 0) {
            this.forceUpdate();
            return;
        }

        // 정답을 반환하는 로직
        this.state.answer = checkList;
        this.props.onCreate(this.state);
        e.target.answer.forEach((i) => i.checked = false);
        e.target.answerInput.forEach((i) => i.value = '');
        this.setState({
            number: '',
            title: '',
            score: 1,
            answerCount: 5,
        });
    }

    getItems = () => {
        const list = [];
        for (let i = 0; i<this.state.answerCount; i++) {
            list.push(
                <div>
                    <label form={"check" + i}>
                    <input id={"check" + i} type={"checkbox"} name={"answer"} value={i.toString()}/>
                        {ProblemForm.numberList[i].name}
                    </label>
                    <input id={i.toString()} name={"answerInput"} onChange={this.onCheckChange}/>
                    <br/>
                </div>
            );
        }
        return list;
    }

    render() {
        const size = this.props.onSizeCreate() + 1;
        return(
            <div>
                {this.errorMessageList.length !== 0 && this.errorMessageList.map(v => <div style={{color: "red"}}>{v}</div>)}
                <form onSubmit={this.onSubmit}>
                    <table>
                        <tr>
                            <td>문제 번호</td>
                            <td><input placeholder={"number"} value={this.state.numberAuto ? size : this.state.number} onChange={this.onChange} name={"number"} disabled={this.state.numberAuto}/></td>
                            <td><input id={"auto_increment"} type={"checkbox"} defaultChecked={true} value={this.state.numberAuto} name={"numberAuto"} onChange={this.onChange}/></td>
                            <td><label for={"auto_increment"}>번호 자동 증가</label></td>
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
                    <br/>
                    <button type={"submit"}>추가</button>
                </form>
            </div>
        )
    }
}

export default ProblemForm;