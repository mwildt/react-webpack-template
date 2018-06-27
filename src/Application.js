import React, { Component} from 'react'

import "./Application.scss";

const FormContext = React.createContext();

const Debug = (props) => {
    return (
        <pre>{JSON.stringify(props.data, null, 2)}</pre>
    )
};

export class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            model: this.props.model,
            updateModel: (reducer) => this.updateModel(reducer),
        };
    }

    updateModel(reducer) {
        const stateReducer = state => {
            const reduced = {model: reducer(state.model)};
            return Object.assign(state, reduced);
        };

        const postStateChangedHandler = () => this.props.onModelChange(this.state.model);

        this.setState(stateReducer, postStateChangedHandler);
    }

    render() {

        return (
            <FormContext.Provider value={this.state}>
                <form>{this.props.children}</form>
            </FormContext.Provider>
        );
    }
}


export class Input extends Component {

    onChange($event, formState) {
        const value = $event.target.value;
        formState.updateModel(model => Object.assign({}, model, {[this.props.name]: value}));
    }

    render() {

        return (
            <FormContext.Consumer>
                {formState => <input name={this.props.name}
                        value={this.props.value(formState.model) || ""}
                        onChange={$event => this.onChange($event, formState)}/>}
            </FormContext.Consumer>
        );
    }

}


export class Select extends Component {

    onChange($event, formState) {
        const value = this.props.options.find(opt => opt.id == $event.target.value);
        formState.updateModel(model => Object.assign({}, model, {[this.props.name]: value}));
    }

    render() {
        const options = this.props.options.map(opt => <option key={opt.id} value={opt.id}>{opt.value}</option>);

        return (
            <FormContext.Consumer>
                {formState => <select name={this.props.name}
                                     value={this.props.value(formState.model)?.id}
                                      onChange={$event => this.onChange($event, formState)}>{options}</select>}
            </FormContext.Consumer>
        );
    }

}

export class Application extends Component {

    constructor(props) {
        super(props);
        this.state = {
            model: {}
        };
    }

    onChange(model) {
        this.setState(s => Object.assign(s, {model: model}));
    }

    render(){

        const options = [
            {id: 1, value: "Java"},
            {id: 2, value: "Scala"}
        ];

        return(
            <div>
                <Form model={this.state.model} onModelChange={model => this.onChange(model)}>
                    <Input name="name" value={model => model.name}></Input>

                    <Select name="lang"
                            onChange={model => this.onChange(model)}
                            value={model => model.name}
                            options={options} >
                    </Select>

                </Form>

                <Debug data={this.state} />
            </div>
        );
    }
}
