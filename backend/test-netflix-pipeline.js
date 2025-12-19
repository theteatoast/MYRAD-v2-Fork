// Test script for Netflix pipeline
import { processNetflixData } from './netflixPipeline.js';

const testData = {
    displayName: 'PRADIP',
    membershipDetails: { planType: 'Basic plan' },
    watchHistory: [
        { title: 'Fast &amp; Furious Presents: Hobbs &amp; Shaw', titleId: '81073022', date: '15/12/25' },
        { title: 'The Recruit: Season 2: "Episode 1"', titleId: '81676295', date: '02/9/25' },
        { title: 'The Recruit: Season 2: "Episode 2"', titleId: '81676296', date: '02/9/25' },
        { title: 'The Recruit: Season 1: "Pilot"', titleId: '81458581', date: '01/9/25' },
        { title: 'Narcos: Season 1: "Descenso"', titleId: '80025313', date: '21/8/25' },
        { title: 'Bhool Bhulaiyaa 3', titleId: '81686134', date: '25/1/25' },
        { title: 'Khakee: The Bengal Chapter: "Lanka Dahan"', titleId: '81660720', date: '21/3/25' },
        { title: 'Khakee: The Bengal Chapter: "The Mole"', titleId: '81660719', date: '21/3/25' }
    ]
};

async function test() {
    console.log('Testing Netflix Pipeline...\n');

    const result = await processNetflixData(testData);

    console.log('\n========== TOP SERIES ==========');
    console.log(JSON.stringify(result.sellableRecord.content_catalog.top_series, null, 2));

    console.log('\n========== MOVIES WATCHED ==========');
    console.log(JSON.stringify(result.sellableRecord.content_catalog.movies_watched, null, 2));

    console.log('\n========== RAW PROCESSED ==========');
    console.log(JSON.stringify(result.rawProcessed, null, 2));
}

test().catch(console.error);
