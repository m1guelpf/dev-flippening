import { FC } from 'react'
import * as timeago from 'timeago.js'

const Index: FC<{ alexFollows: number; miguelFollows: number; lastUpdated: number }> = ({
	alexFollows,
	miguelFollows,
	lastUpdated,
}) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-[25vw] font-bold text-black font-mono">{alexFollows - miguelFollows}</h1>
			<p>last updated {timeago.format(lastUpdated)}</p>
		</div>
	)
}

export async function getStaticProps() {
	const [alexMasmej, m1guelpf] = await fetch(
		`https://api.twitter.com/2/users/by?usernames=alexmasmej,m1guelpf&user.fields=public_metrics`,
		{
			headers: { Authorization: `Bearer ${process.env.TWITTER_TOKEN}` },
		}
	)
		.then(res => res.json())
		.then(res => res.data)

	return {
		props: {
			alexFollows: alexMasmej.public_metrics.followers_count,
			miguelFollows: m1guelpf.public_metrics.followers_count,
			lastUpdate: new Date().getTime(),
		},
		revalidate: 1,
	}
}

export default Index
