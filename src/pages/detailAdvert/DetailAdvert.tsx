import React, {
    useEffect,
    useMemo,
    useContext,
    useLayoutEffect,
    useState,
    ReactElement,
    useCallback,
} from 'react';
import styles from './detailAdvert.module.scss';
import { ReactComponent as Watch } from 'assets/icons/watch.svg';
import Button from 'components/common/button';
import { useParams, useNavigate } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DETAIL_ADVERT, COMMENT_FEED } from 'apollo/query';
import Hashids from 'hashids';
import LoadedPage from 'components/LoadedPage/LoadedPage';
import GlobalContext from 'store/context';
import { plural, stringToDate } from 'utils/index';
import { TOGGLE_FAVORITE, ADD_COMMENT } from 'apollo/mutation';
import FavoriteButton from 'components/common/favoriteButton';
import classNames from 'classnames';
import BaseModal from 'components/common/baseModal';
import MultiInput from 'components/common/multiInput';

interface DetailAdvert {
    _id: string;
    author: { avatar: string; username: string };
    category: Array<string> | [];
    contact: string;
    content: string;
    favoriteCount: number;
    favoritedBy: [] | Array<{ id: string }>;
    name: string;
    watch: number;
    createdAt: string;
}

interface Comment {
    _id: string;
    author: { username: string };
    content: string;
    createdAt: string;
}

const DetailAdvert: React.FC = (): ReactElement => {
    // const cardClasses = classNames([[styles.h2], { [styles.h2]: true, xxx: true }]);

    const {
        header: { setHeader },
        authorization: {
            stateAuthorization: { user },
        },
    } = useContext(GlobalContext);

    // routing
    const navigate = useNavigate();

    // set header
    useLayoutEffect(() => setHeader('Подробное описание'), []);

    // route param
    const { id }: { id?: string } = useParams();

    const decode = useCallback(
        (id: string) => new Hashids().decodeHex(id),
        [id]
    );

    const limit = 4;

    // apollo
    const [getAdvert, { data, loading, error }] = useLazyQuery(DETAIL_ADVERT);
    const [
        getComments,
        {
            data: dataComments,
            fetchMore: fetchMoreComments,
            loading: isLoadingComments,
        },
    ] = useLazyQuery(COMMENT_FEED);

    // initial advert
    useEffect((): void => {
        if (!id) {
            return;
        }

        const _id = decode(id);

        // console.log(_id);
        getAdvert({
            variables: {
                advertId: _id,
            },
            notifyOnNetworkStatusChange: true,
            // onCompleted(data) {
            //     console.log(data);
            // },
            // onError: (error) => {
            //     console.log(error);
            // },
        });

        getComments({
            variables: {
                limit: limit,
                offset: 0,
                idAdvert: _id,
            },
            notifyOnNetworkStatusChange: true,
            // onCompleted(data) {
            //     console.log('comments: ', data);
            // },
            // onError: (error) => {
            //     console.log('error comments', error);
            // },
        });
    }, []);

    const comments: undefined | Array<Comment> = useMemo(() => {
        if (!dataComments) {
            return;
        }
        return dataComments?.commentFeed?.comments;
    }, [dataComments]);

    // base data
    const advert: undefined | DetailAdvert = useMemo(() => {
        if (!data) {
            return;
        }
        return data?.advert;
    }, [data]);

    // me liked
    const isFavorite = useMemo<boolean>(() => {
        return Boolean(
            advert?.favoritedBy.some(
                ({ id }: { id?: string }): boolean => id === user?._id
            )
        );
    }, [advert]);

    // apollo
    const [addRemoveFavorite] = useMutation(TOGGLE_FAVORITE);

    const toggleFavorite = (e: React.MouseEvent): void => {
        e.stopPropagation();

        if (!id) {
            return;
        }

        const _id = decode(id);

        addRemoveFavorite({
            variables: {
                toggleFavoriteId: _id,
            },
        });
    };

    const loadMoreComments = (): void => {
        // e.stopPropagation();
        // console.log('loadMore comments');
        if (!id) {
            return;
        }

        const _id = decode(id);

        fetchMoreComments({
            variables: {
                limit: limit,
                offset: dataComments.commentFeed.comments.length,
                idAdvert: _id,
            },
            updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
                return {
                    commentFeed: {
                        ...fetchMoreResult.commentFeed,
                        offset: fetchMoreResult.commentFeed.offset + limit,
                        comments: [
                            ...previousResult.commentFeed.comments,
                            ...fetchMoreResult.commentFeed.comments,
                        ],
                    },
                };
            },
        });
    };

    // show modal for comment
    const [showModal, setShowModal] = useState(false);

    const showModalChange = (): void => {
        // event.stopPropagation();
        setShowModal((status: boolean): boolean => !status);
    };

    // comment state

    const [commentText, setCommentText] = useState<string | undefined>('');
    const [errorComment, setErrorComment] = useState<boolean | string>('');

    const changeCommentText = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setCommentText(event.currentTarget?.value);
    };

    // check valid
    const isValid = useCallback(() => {
        let valid = true;
        const limit = 100;

        if (!commentText) {
            valid = false;
            setErrorComment('Поле комментария не может быть пустым');
        }

        if (commentText?.length && commentText.length > limit) {
            valid = false;

            setErrorComment(
                `Комментарий не может быть больше ${limit} символов`
            );

            setCommentText((commentText): string | undefined => {
                if (commentText) {
                    return commentText?.slice(0, limit);
                }
            });
        }

        return valid;
    }, [commentText]);

    // apollo add comments
    // Refetches two queries after mutation completes
    const [addCommentGQL, { loading: isLoadingAddCom }] =
        useMutation(ADD_COMMENT);

    // add new comment
    const addComment = (): void => {
        // reset error
        setErrorComment(false);

        // valid comment
        const valid: boolean = isValid();

        if (!valid) {
            return;
        }

        if (!id) {
            return;
        }

        const _id = decode(id);

        // send gql
        addCommentGQL({
            variables: {
                content: commentText,
                idAdvert: _id,
            },
            onCompleted: (): void => {
                // fetch comments
                loadMoreComments();
                // clear textarea
                setCommentText('');
                // close modal
                showModalChange();
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    // focus multiInput clear error
    const focusComment = (): void => {
        setErrorComment('');
    };

    // back page
    const backStep = (): void => {
        navigate(-1);
    };

    // Render template
    if (error) {
        return <h3>Что то пошло не так и объявление не найдено</h3>;
    }

    return (
        <div className={styles.detailPage}>
            {loading ||
                isLoadingAddCom ||
                (isLoadingComments && <LoadedPage />)}

            {showModal && (
                <BaseModal onClick={showModalChange}>
                    <MultiInput
                        placeholder="напиши свой комментарий тут"
                        size="default"
                        value={commentText}
                        isError={errorComment}
                        onInput={changeCommentText}
                        onFocus={focusComment}
                    />
                    <Button
                        name="добавить комментарий"
                        full
                        size="small"
                        type="outline"
                        className={styles.addComment}
                        onClick={addComment}
                    />
                    <h5 className={styles.errorMessageShow}>{errorComment}</h5>
                </BaseModal>
            )}

            <Button
                name="назад"
                color="black"
                size="default"
                full
                onClick={backStep}
            />

            {Boolean(advert) && (
                <>
                    <div className={styles.authorSection}>
                        <div className={styles.icon}>
                            <img src={advert?.author.avatar} alt="" />
                        </div>
                        <div className={styles.author}>
                            {advert?.author?.username}
                        </div>
                    </div>
                    <div className={styles.wrapperHeader}>
                        <div className={styles.watch}>
                            <Watch />
                            <span>{advert?.watch}</span>
                            <span>
                                {advert &&
                                    plural(advert?.watch, [
                                        'просмотр',
                                        'просмотра',
                                        'просмотров',
                                    ])}
                            </span>
                        </div>
                        <div className={styles.created}>
                            {advert && stringToDate(advert?.createdAt)}
                        </div>
                    </div>
                    <h3 className={styles.name}>{advert?.name}</h3>
                    <p className={styles.content}>{advert?.content}</p>

                    {Boolean(advert?.category.length) && (
                        <div className={styles.tags}>
                            {advert?.category.map((category: string) => {
                                return (
                                    <Button
                                        key={`category ${category}`}
                                        name={category}
                                        type="outline"
                                        color="black"
                                    />
                                );
                            })}
                        </div>
                    )}

                    {Boolean(advert?.contact) && (
                        <div className={styles.contactSection}>
                            <h5 className={styles.title}>контакты:</h5>
                            <p className={styles.description}>
                                {advert?.contact}
                            </p>
                        </div>
                    )}

                    {Boolean(!advert?.contact) && (
                        <div className={styles.contactSection}>
                            <h5 className={styles.title}>
                                контакты отсутствуют
                            </h5>
                        </div>
                    )}

                    <FavoriteButton
                        isFavorite={isFavorite}
                        count={advert?.favoriteCount}
                        onClick={toggleFavorite}
                    />
                </>
            )}

            <Button
                name="добавить комментарий"
                type="outline"
                size="small"
                onClick={showModalChange}
            />

            <div className={styles.commentSection}>
                {Boolean(comments?.length) && (
                    <>
                        <h5 className={styles.title}>комментарии:</h5>
                        {comments?.map((comment) => {
                            return (
                                <article
                                    key={comment._id}
                                    className={styles.card}
                                >
                                    <div className={styles.upComment}>
                                        <h6 className={styles.author}>
                                            {comment.author.username}
                                        </h6>
                                        <div className={styles.created}>
                                            {stringToDate(comment?.createdAt)}
                                        </div>
                                    </div>

                                    <p className={styles.comment}>
                                        {comment.content}
                                    </p>
                                </article>
                            );
                        })}
                    </>
                )}

                {Boolean(
                    comments?.length != dataComments?.commentFeed?.totalComments
                ) && (
                    <Button
                        name="еще комментарии"
                        type="outline"
                        color="black"
                        className={styles.moreComment}
                        onClick={loadMoreComments}
                    />
                )}

                {Boolean(!comments?.length) && (
                    <>
                        <h5 className={styles.title}>
                            комментарии отсутствуют
                        </h5>
                    </>
                )}
            </div>
        </div>
    );
};

export default DetailAdvert;
