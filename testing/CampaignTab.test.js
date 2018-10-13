import {shallow, mount, configure} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import CampaignTab from '../client/src/Components/CampaignTab.jsx';

configure({ adapter: new Adapter() });

describe('Campaign Tab Component', () => {

    const fakeCampaignData = {
        aboutSection: {
            title: "Tasty Cotton Pants",
            image: "https://source.unsplash.com/random",
            paragraph: "Consectetur tempore ipsum ipsam porro ut laborum fugit. Unde porro ist..."
        },
        otherSections: [
        {
            title: "Organized national benchmark",
            image: "https://source.unsplash.com/random",
            paragraph: "Veritatis fugit ipsa repellendus eius. Accusamus doloremque"
        },
        {
            title: "Optional methodical matrix",
            image: "https://source.unsplash.com/random",
            paragraph: "Distinctio repellat maiores modi hic et sit dolores"
        }
        ]
    }

    test('it creates sections from the given content', (done) => {
        const wrapper = mount(<CampaignTab content={fakeCampaignData}/>);
        fakeCampaignData.content = fakeCampaignData;
        const sections = wrapper.instance().displayContent(fakeCampaignData);
        expect(Array.isArray(sections)).toBe(true);
        done();
    });

    test('it displays section titles and paragraphs', (done) => {
        const wrapper = mount(<CampaignTab content={fakeCampaignData}/>);
        const sectionTitle = wrapper.find('.sectionTitle');
        const sectionParagraph = wrapper.find('.sectionParagraph');
        const expected = {
            0: fakeCampaignData.aboutSection,
            1: fakeCampaignData.otherSections[0],
            2: fakeCampaignData.otherSections[1]
        }
        for (var i = 0; i < 2; i++) {
            let title = shallow(sectionTitle.get(i));
            let paragraph = shallow(sectionParagraph.get(i));
            expect(title.text().trim()).toEqual(expected[i].title);
            expect(paragraph.text().trim()).toEqual(expected[i].paragraph);
        }
        done();
    });
});