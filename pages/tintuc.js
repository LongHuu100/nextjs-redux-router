import Helmet from 'react-helmet'

const TinTuc =  props => {

    TinTuc.getInitialProps = ({query}) => {
        console.log('SLUG', query.slug)
        return { slug: query.slug }
    }

    return (
        <>
            <Helmet>
                <meta name="description" content="Buy beautiful, high quality carpets for your home."/>
                <title>Beautiful, high quality carpets | CarpetCity</title>
            </Helmet>
            <h1>Tin Tuc</h1>
        </>
    )
}

export default TinTuc;
