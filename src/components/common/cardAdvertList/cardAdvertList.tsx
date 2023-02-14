import React from 'react';
import styles from './cardAdvertList.module.scss';
import CardAdvertPreview from '../cardAdvertPreview';
import CardPreview from 'interfaces/CardPreview';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import InfiniteScroll from 'react-infinite-scroller';

// interface Props {
//     adverts: Array<CardPreview> | [];
// }

interface Props {
    adverts: Array<number> | [];
}

const CardAdvertList = ({ adverts }: Props): JSX.Element => {
    const loadFunc = () => {
        console.log('loadFunc');
    };

    return (
        // <div>
        //     {adverts.map((advert) => (
        //         <CardAdvertPreview key={advert.id} {...advert} />
        //     ))}
        // </div>
        <div className={styles.listWrapper}>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadFunc}
                hasMore={true || false}
                loader={
                    <div className="loader" key={0}>
                        Loading ...
                    </div>
                }
                useWindow={false}
            >
                {adverts.map((advert, i) => (
                    <CardAdvertPreview key={i} />
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default CardAdvertList;
