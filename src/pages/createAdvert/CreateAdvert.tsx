import React, {
    ReactElement,
    useContext,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';
import GlobalContext from 'store/context';
import styles from './createAdverts.module.scss';
import classNames from 'classnames';

interface IAdvertCreate {
    name: string;
    content: string;
    category: Array<string>;
    contact?: string;
}

type statusError = boolean | string | undefined;

interface IErrorObject {
    errorName: statusError;
    errorContent: statusError;
    errorCategory: statusError;
}

const errorsObject: IErrorObject = {
    errorName: '',
    errorContent: '',
    errorCategory: '',
};

const CreateAdverts: React.FC = (): ReactElement => {
    const classesWrap = classNames([[styles.createWrap]]);

    const {
        header: { setHeader },
    } = useContext(GlobalContext);

    useLayoutEffect((): void => setHeader('Создание объявления'), []);

    // field adverts
    const [name, setName]: [string, (str: string) => void] =
        useState<string>('');

    const [content, setContent]: [string, (str: string) => void] =
        useState<string>('');

    const [category, setCategory]: [
        Array<string>,
        (list: Array<string>) => void
    ] = useState<Array<string>>(['']);

    const [contact, setContact]: [string, (contact: string) => void] =
        useState<string>('');

    // all errors
    const [errors, setErrors]: [IErrorObject, (errors: IErrorObject) => void] =
        useState<IErrorObject>(errorsObject);

    // error status
    const isError = useMemo<boolean>(() => {
        return Object.values(errors).some((errorValue) => errorValue);
    }, [errors]);

    const resetErrors = (): void => setErrors(errorsObject);

    return (
        <div className={classesWrap}>
            <h5>название</h5>
            {/* <h2 className={classes}>Adverts</h2> */}
            <h3>Create Adverts</h3>
        </div>
    );
};

export default CreateAdverts;
