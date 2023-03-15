import React, {
    useEffect,
    useMemo,
    useContext,
    useLayoutEffect,
    useState,
    ReactElement,
} from 'react';
import styles from './detailAdvert.module.scss';
import { ReactComponent as Watch } from 'assets/icons/watch.svg';
import Button from 'components/common/button';
import { useParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DETAIL_ADVERT, COMMENT_FEED } from 'apollo/query';
import Hashids from 'hashids';
import LoadedPage from 'components/LoadedPage/LoadedPage';
import GlobalContext from 'store/context';
import { plural, stringToDate } from 'utils/index';
import { TOGGLE_FAVORITE } from 'apollo/mutation';
import FavoriteButton from 'components/common/favoriteButton';
import classNames from 'classnames';
import BaseModal from 'components/common/baseModal';

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

    // set header
    useLayoutEffect(() => setHeader('Подробное описание'), []);

    // route param
    const { id }: { id?: string } = useParams();

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

        const _id = new Hashids().decodeHex(id);

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

        const _id = new Hashids().decodeHex(id);
        addRemoveFavorite({
            variables: {
                toggleFavoriteId: _id,
            },
        });
    };

    const loadMoreComments = (e: React.MouseEvent): void => {
        e.stopPropagation();
        // console.log('loadMore comments');
        if (!id) {
            return;
        }

        const _id = new Hashids().decodeHex(id);

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

    const showModalChange = (event: React.MouseEvent): void => {
        // event.stopPropagation();
        setShowModal((status: boolean): boolean => !status);
    };

    if (error) {
        return <h3>Что то пошло не так и объявление не найдено</h3>;
    }

    return (
        <div className={styles.detailPage}>
            {loading || (isLoadingComments && <LoadedPage />)}

            {showModal && <BaseModal onClick={showModalChange}>test</BaseModal>}

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
