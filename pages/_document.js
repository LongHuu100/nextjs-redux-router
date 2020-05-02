import Document, { Head, Main, NextScript } from 'next/document'
import Helmet from 'react-helmet'

export default class extends Document {

    static async getInitialProps (ctx) {

        const originalRenderPage = ctx.renderPage
        ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: App => props => <App {...props} />
        })

        const documentProps = await Document.getInitialProps(ctx)
        return {
            ...documentProps,
            helmet: Helmet.renderStatic(),
            styles: (
                <>
                    {documentProps.styles}
                </>
            )
        }
    }

    get helmetHtmlAttrComponents () {
        return this.props.helmet.htmlAttributes.toComponent()
    }

    get helmetBodyAttrComponents () {
        return this.props.helmet.bodyAttributes.toComponent()
    }

    get helmetHeadComponents () {
        return Object.keys(this.props.helmet)
        .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
        .map(el => this.props.helmet[el].toComponent())
    }

    get helmetJsx () {
        return (
            <Helmet/>
        )
    }

    render () {
        return (
            <html {...this.helmetHtmlAttrComponents}>
                <Head>
                    { this.helmetJsx }
                    { this.helmetHeadComponents }
                </Head>
                <body {...this.helmetBodyAttrComponents}>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}
