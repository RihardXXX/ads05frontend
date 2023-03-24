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
import MultiInput from 'components/common/multiInput';
import Input from 'components/common/input';

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

    const [category, setCategory]: [Array<string>, (list: any) => void] =
        useState<Array<string>>(['']);

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

    type field = 'name' | 'category' | 'content' | 'contact';

    const changeField = (
        e: React.FormEvent<HTMLTextAreaElement>,
        type: field
    ): void => {
        const value: string = e.currentTarget.value;

        switch (type) {
            case 'name':
                setName(value);
                break;
            case 'content':
                setContent(value);
                break;
            default:
                break;
        }
    };

    const onFocus = (type: field): void => {
        // switch (key) {
        //     case value:
        //         break;
        //     default:
        //         break;
        // }
    };

    const addCategory = (event: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(event.currentTarget.value.trim());
    };

    return (
        <div className={classesWrap}>
            <MultiInput
                size="small"
                isError={errorsObject.errorName}
                value={name}
                placeholder="название объявления"
                label="название"
                id="name"
                className={styles.field}
                onInput={(e) => changeField(e, 'name')}
                onFocus={() => onFocus('name')}
            />
            <MultiInput
                size="default"
                isError={errorsObject.errorContent}
                value={content}
                placeholder="Основной контент объявления"
                label="описание"
                id="content"
                className={styles.field}
                onInput={(e) => changeField(e, 'content')}
                onFocus={() => onFocus('content')}
            />
            <MultiInput
                size="small"
                value={contact}
                placeholder="контактная информация"
                label="контактная информация"
                id="contact"
                className={styles.field}
                onInput={(e) => changeField(e, 'contact')}
                onFocus={() => onFocus('contact')}
            />

            <Input
                label="категории"
                className={styles.field}
                placeholder="добавьте категорию"
                onChange={addCategory}
            />
        </div>
    );
};

export default CreateAdverts;
