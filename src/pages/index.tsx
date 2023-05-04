import Head from 'next/head'
import Creator from "@/components/Creator/Creator";
import {Provider} from "react-redux";
import {store} from "@/store/store";
import dynamic from "next/dynamic";
const NoSsrCreator=()=>{
    return <Creator/>
}
const MyCreator = dynamic(() => Promise.resolve(NoSsrCreator), {
    ssr: false,
})

export default function Home() {
    return (
        <>
            <Head>
                <title>Website Creator</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <Provider store={store}>
                    <MyCreator/>
                </Provider>
            </main>
        </>
    )
}
