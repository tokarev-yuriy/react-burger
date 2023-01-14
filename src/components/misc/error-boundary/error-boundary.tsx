import React, { ReactElement, ReactNode } from "react";

type TErrorBoundaryState = {
    hasError: boolean;
};
interface IErrorBoundaryProps {
    children?: ReactNode;
  }

class ErrorBoundary extends React.Component<IErrorBoundaryProps> {
    state: TErrorBoundaryState;

    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: string): TErrorBoundaryState {
        return { hasError: true };
    }

    render(): ReactNode {
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