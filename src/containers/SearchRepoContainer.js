import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTopRepos } from 'actions/repos'
import SearchResults from 'components/SearchResults'

const SearchRepoContainer = (props) => {

    SearchRepoContainer.getInitialProps = async ({ store, query }) => {
        const lang = query.lang || 'javascript'
        await store.dispatch(getTopRepos({ lang }))
        return { lang }
    }

    const dispatch = useDispatch();
    const { repos } = useSelector(state => state);

    useEffect( () => {
        if(repos.get('lang') == '')
            dispatch( getTopRepos({ lang: 'javascript' }) );
    }, []);

    const _goToAbout = () => {
        props.router.push('/about')
    }

    useEffect( () => {
        console.log('repos->', repos)
    }, [repos.get('lang')]);

    return (
        <Fragment>
            <div onClick={_goToAbout}>
                GO TO ABOUT (with <code>router</code>)
            </div>
            { repos.get('lang') != '' && <SearchResults repos={repos} /> }
        </Fragment>
    )
}

export default SearchRepoContainer
