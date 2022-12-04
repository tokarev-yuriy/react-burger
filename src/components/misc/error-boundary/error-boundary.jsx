import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <section>
                <h1>Что-то пошло не так :(</h1>
                <p>
                    В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
                </p>
                </section>
            );
        }
        return this.props.children;
    }
}

export { ErrorBoundary };