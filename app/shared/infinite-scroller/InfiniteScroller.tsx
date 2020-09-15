import React, { Component } from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';

type Props = {
    children: React.ReactNode,
    loadMore: (page) => void,
    element: string,
    hasMore?: boolean,
    initialLoad?: boolean,
    isReverse?: boolean,
    loader?: React.ReactNode,
    pageStart?: number,
    ref?: (node) => void,
    getScrollParent?: () => void,
    threshold?: number,
    useCapture?: boolean,
    useWindow?: boolean
};

export class InfiniteScroll extends Component<Props> {

    static defaultProps = {
        element: 'div',
        hasMore: false,
        initialLoad: true,
        pageStart: 0,
        ref: null,
        threshold: 250,
        useWindow: true,
        isReverse: false,
        useCapture: false,
        loader: null,
    };

    pageLoaded = 0;
    loadMore? = false;
    options: any = {};
    beforeScrollHeight = 0;
    beforeScrollTop = 0;
    defaultLoader = null;
    scrollComponent: any = null;
    throttledScrollListener: any = null;
    debouncedScrollListener: any = null;

    constructor(props) {
        super(props);

        this.scrollListener = this.scrollListener.bind(this);
        this.throttledScrollListener = throttle(this.scrollListener, 300, { leading: false });
        this.debouncedScrollListener = debounce(this.scrollListener, 300);
    }

    componentDidMount() {
        this.pageLoaded = this.props.pageStart || 0;
        this.attachScrollListener();
    }

    componentDidUpdate() {
        this.attachScrollListener();
    }

    componentWillUnmount() {
        this.detachScrollListener();
    }

    // Set a defaut loader for all your `InfiniteScroll` components
    setDefaultLoader(loader) {
        this.defaultLoader = loader;
    }

    detachScrollListener() {
        let scrollEl = window;
        if (this.props.useWindow === false) {
            scrollEl = this.scrollComponent.parentNode;
        }

        scrollEl.removeEventListener('scroll', this.throttledScrollListener, this.props.useCapture);
        scrollEl.removeEventListener('resize', this.debouncedScrollListener, this.props.useCapture);
    }

    attachScrollListener() {
        if (!this.props.hasMore) {
            return;
        }

        let scrollEl = window;
        if (this.props.useWindow === false) {
            scrollEl = this.scrollComponent.parentNode;
        }

        scrollEl.addEventListener('scroll', this.throttledScrollListener, this.props.useCapture);
        scrollEl.addEventListener('resize', this.debouncedScrollListener, this.props.useCapture);

        if (this.props.initialLoad) {
            this.scrollListener();
        }
    }

    scrollListener() {
        const el = this.scrollComponent;
        const scrollEl = window;

        let offset;
        if (this.props.useWindow) {
            const scrollTop = (scrollEl.pageYOffset !== undefined) ?
            scrollEl.pageYOffset :
            (document.documentElement || document.body.parentNode || document.body).scrollTop;
            if (this.props.isReverse) {
                offset = scrollTop;
            } else {
                offset = this.calculateTopPosition(el) + (el.offsetHeight - scrollTop - window.innerHeight);
            }
        } else if (this.props.isReverse) {
            offset = el.parentNode.scrollTop;
        } else {
            offset = el.scrollHeight - el.parentNode.scrollTop - el.parentNode.clientHeight;
        }

        if (offset < Number(this.props.threshold)) {
            this.detachScrollListener();
            // Call loadMore after detachScrollListener to allow for non-async loadMore functions
            if (typeof this.props.loadMore === 'function') {
                this.props.loadMore(this.pageLoaded += 1);
            }
        }
    }

    calculateTopPosition(el) {
        if (!el) {
            return 0;
        }
        return el.offsetTop + this.calculateTopPosition(el.offsetParent);
    }

    render() {
        const {
            children,
            element,
            hasMore,
            initialLoad,
            isReverse,
            loader,
            loadMore,
            pageStart,
            ref,
            threshold,
            useCapture,
            useWindow,
            ...props
        } = this.props;

        const newProps: any = { ...props };
        newProps.ref = (node) => {
            this.scrollComponent = node;
            if (ref) {
                ref(node);
            }
        };

        const childrenArray = [children];
        if (hasMore) {
            if (loader) {
                isReverse ? childrenArray.unshift(loader) : childrenArray.push(loader);
            } else if (this.defaultLoader) {
                isReverse ?
                    childrenArray.unshift(this.defaultLoader) :
                    childrenArray.push(this.defaultLoader);
            }
        }
        return React.createElement(element, newProps, ...childrenArray);
    }
}
