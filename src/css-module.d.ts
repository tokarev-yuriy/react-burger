declare module '*.css' {
    interface IClassNames {
        [name: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}