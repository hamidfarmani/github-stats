import Head from 'next/head';
import { Fragment } from 'react';

export default function PageContainer({title,children}){
    return <>
        <Head>
            <title>{title}</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            <link rel="shortcut icon" href="/github.png" type="image/png" />
        </Head>
        <>
            {children}
        </>
    </>
}