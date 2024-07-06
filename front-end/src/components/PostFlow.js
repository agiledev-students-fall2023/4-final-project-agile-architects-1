import React, { useEffect, useRef, useState } from 'react';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import PostBlock from './PostBlock';
import { debounce } from 'lodash';

const PostFlow = ({ posts }) => {
    const gridRef = useRef(null);
    const[layoutReady, setLayoutReady] = useState(false)

    useEffect(() => {
        const gridElement = gridRef.current;
        if (gridElement) {
            // Ensure all images are loaded before layout with Masonry
            imagesLoaded(gridElement, () => {
                setTimeout(() => {
                    setLayoutReady(true);
                }, 100);
            });
        }
    }, [posts]);

    useEffect(() => {
        const gridElement = gridRef.current;
        if (gridElement && layoutReady) {
            const msnry = new Masonry(gridElement, {
                itemSelector: '.post-block',
                columnWidth: '.post-block',
                percentPosition: true,
                gutter: 15,
            });

            const layoutAndCenter = () => {
                msnry.layout();
                centerMasonryColumns(msnry);
            }

            const centerMasonryColumns = (msnry) => {
                const msnryWidth = msnry.cols * msnry.columnWidth;
                const viewportWidth = window.innerWidth;
                const extraSpace = (viewportWidth - msnryWidth) / 2;
                msnry.element.style.marginLeft = `${extraSpace > 0 ? extraSpace : 0}px`;
                console.log("Masonry Grid Width:", msnryWidth, "viewport Width:", viewportWidth);
            };

            const resizeMasonryGrid = debounce(layoutAndCenter, 150);
            window.addEventListener('resize', resizeMasonryGrid);

            layoutAndCenter(); //Initial layout
            setTimeout(layoutAndCenter, 500);

            return () => {
                window.removeEventListener('resize', resizeMasonryGrid);
                msnry.destroy();
            };
        }
    }, [layoutReady]);

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
