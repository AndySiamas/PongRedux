import {shallow, mount, configure} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import FaqTab from '../client/src/Components/FaqTab';
import Question from '../client/src/Components/Utilities/Question';

configure({ adapter: new Adapter() });

describe('Faq Tab', () => {

    const fakeData = {};
    fakeData.questions = [
    {
        inquiry: "Quae itaque excepturi rerum molestiae?",
        answer:"Voluptate aut asperiores.",
        lastUpdated: "2018-09-11 07:47:25.432"
    },
    {
        inquiry: "Maxime et consequatur?",
        answer:"Eius et autem deleniti natus temporibus veritatis doloremque.",
        lastUpdated: "2018-09-11 09:49:05.049"
    }
    ]

    test('it converts each prop question into a react component', (done) => {
        const faqTab = mount(<FaqTab questions={fakeData.questions}/>);
        const allQuestions = faqTab.instance().displayQuestions(faqTab.props());
        allQuestions.forEach((question) => {
            const questionProps = Object.keys(shallow(question).instance().props);
            expect(questionProps).toContain('inquiry');
            expect(questionProps).toContain('answer');
            expect(questionProps).toContain('lastUpdated');
        });
        done();
    });

    test('it displays all questions on the screen', (done) => {
        const faqTab = mount(<FaqTab questions={fakeData.questions}/>);
        const allQuestions = faqTab.find(Question);
        const expected = {
            0: fakeData.questions[0],
            1: fakeData.questions[1]
        }
        for (var i = 0; i < 2; i++) {
            let question = shallow(allQuestions.get(i));
            let inquiry = question.find('.questionText');
            let answer = question.find('.answerText');
            let lastUpdated = question.find('.answerDate');

            expect(inquiry.text().trim()).toEqual(expected[i].inquiry);
            expect(answer.text().trim()).toEqual(expected[i].answer);
            expect(lastUpdated.text().trim()).toEqual(moment(expected[i].lastUpdated).format('LL'));
        }
        done();
    });
});