import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import PostBlock from './PostBlock';

const PostFlow = ({ posts }) => {
    const gridRef = useRef(null);

    useEffect(() => {
        const gridElement = gridRef.current;
        if (gridElement) {
            const msnry = new Masonry(gridElement, {
                itemSelector: '.post-block',
                columnWidth: '.post-block',
                percentPosition: true,
                gutter: 15,
            });

            const resizeMasonryGrid = () => {
                imagesLoaded(gridElement, function() {
                    msnry.layout();
                    centerMasonryColumns(msnry);
                });
            };

            const centerMasonryColumns = (msnry) => {
                const msnryWidth = msnry.cols * msnry.columnWidth;
                const viewportWidth = window.innerWidth;
                const extraSpace = (viewportWidth - msnryWidth) / 2;
                msnry.element.style.marginLeft = `${extraSpace}px`;
                console.log("Masonry Grid Width:", msnryWidth, "viewport Width:", viewportWidth);
            };

            window.addEventListener('resize', resizeMasonryGrid);
            resizeMasonryGrid(); // Call initially to center grid

            return () => window.removeEventListener('resize', resizeMasonryGrid);
        }
    }, [posts]);

    return (
        <div className="post-flow-container">
            <div ref={gridRef} className="post-flow">
                {posts.map((post) => (
                    <PostBlock key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default PostFlow;
