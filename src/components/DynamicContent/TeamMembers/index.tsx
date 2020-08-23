import * as React from 'react';
import { useQuery } from '@apollo/client';
import ReactHtmlParser from 'react-html-parser';
import { Card, StyledBody } from 'baseui/card';
import { Col } from 'antd';
import { GET_TEAM_MEMBERS } from './queries';
import { TeamMember } from './types';
import Loading from '../../Loading';

export default () => {
	const { loading, error, data } = useQuery(GET_TEAM_MEMBERS);

	if (loading) return (<Loading />);
	if (error) return (<span>Error! {error.message}</span>);

	return <React.Fragment>{_renderTeamMembers(data.teamMembers)}</React.Fragment>;
};

/* Render a Col containing a Card for each team member */
export function _renderTeamMembers(teamMembers: TeamMember[]) {
	return teamMembers.map(teamMember =>
		<Col
			key={`col-team-member-${teamMember.name}`} 
			xs={{ span: 12 }} 
			lg={{ span: 8 }}>
			<Card
				overrides={{
					Root: {
						style: {
							margin: '0 auto 1rem auto',
							maxWidth: `${teamMember.profileImage.width}px`
						}
					}
				}}
				key={teamMember.name}
				headerImage={teamMember.profileImage.url}
				title={teamMember.name}>
				<StyledBody>
					{ReactHtmlParser(teamMember.blurb.html)}
				</StyledBody>
			</Card>
		</Col>
	);
}