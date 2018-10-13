import {shallow, mount, configure} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import Description from '../client/src/Components/Description';
import Comments from '../client/src/Components/CommentsTab';
import Comment from '../client/src/Components/Utilities/Comment';

configure({ adapter: new Adapter() });

describe('Comments Tab', () => {

    const fakeData = {};
    fakeData.comments = [
    {
        username: "Warren Clark",
        text: "Praesentium autem dolores voluptate eos quas.",
        icon: "https://randomuser.me/api/portraits/thumb/men/16.jpg",
        date: '2018-09-11 03:10:13.337',
        childComments: [
            {
            username: "Sofia Oja",
            text: "Exercitationem facilis aut quam.",
            icon: "https://randomuser.me/api/portraits/thumb/women/54.jpg",
            date: '2018-09-11 04:21:23.418',
            childComments: []
            }
        ]
    },
    {
        username: "Margretha Nijs",
        text: "Mollitia dolores ut velit voluptatum adipisci vitae aut.",
        icon: "https://randomuser.me/api/portraits/thumb/women/43.jpg",
        date: '2018-09-11 03:17:20.289',
        childComments: []
    }
    ]

    test('it converts each prop comment into a react component', (done) => {
        const commentsTab = mount(<Comments comments={fakeData.comments}/>);
        const allComments = commentsTab.instance().displayComments(commentsTab.props());
        allComments.forEach((comment) => {
            const commentProps = Object.keys(shallow(comment).instance().props);
            expect(commentProps).toContain('text');
            expect(commentProps).toContain('date');
            expect(commentProps).toContain('userIcon');
            expect(commentProps).toContain('username');
            expect(commentProps).toContain('childComments');
            expect(commentProps).toContain('width');
        });
        done();
    });

    test('it displays all comments on the screen', (done) => {
        const commentsTab = mount(<Comments comments={fakeData.comments}/>);
        const allComments = commentsTab.find(Comment);
        const expected = {
            0: fakeData.comments[0],
            1: fakeData.comments[0].childComments[0],
            2: fakeData.comments[1]
        }
        for (var i = 0; i < 2; i++) {
            let comment = shallow(allComments.get(i));
            let name = comment.find('.nameDiv');
            let text = comment.find('.commentText');
            let date = comment.find('.dateDiv');

            expect(name.text().trim()).toEqual(expected[i].username);
            expect(text.text().trim()).toEqual(expected[i].text);
            expect(date.text().trim()).toEqual(moment(expected[i].date).fromNow());
        }
        done();
    });

    test('it is able to change the descriptions current tab', (done) => {
        const description = mount(<Description projectID={8082}/>);
        const changeTab = description.instance().changeTab.bind(description.instance());
        const comments = mount(<Comments changeTab={changeTab}/>);

        expect(description.state().currentTab).toEqual('campaign');
        comments.props().changeTab('faq');
        description.update();
        comments.update();
        expect(description.state().currentTab).toEqual('faq');
        done();
    });
});