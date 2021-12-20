import { FC } from 'react'
import TimeAgo from 'react-timeago'

const Index: FC<{ alexFollows: number; miguelFollows: number; lastUpdate: number }> = ({
	alexFollows,
	miguelFollows,
	lastUpdate,
}) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-[25vw] font-bold text-black font-mono">{alexFollows - miguelFollows}</h1>
			<p>
				last updated <TimeAgo date={lastUpdate} />. follow{' '}
				<a className="underline" href="https://twitter.com/m1guelpf" target="_blank" rel="noreferrer">
					@m1guelpf
				</a>{' '}
				to make numba go down.
			</p>
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
