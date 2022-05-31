import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {

    const [urls, setUrls] = useState([]);

    useEffect(() => {
        async function getPopularUrls() {
            const { data } = await axios.get('/api/bookmarks/popular');
            setUrls(data);
        }

        getPopularUrls();
    }, []);
    return <div className='row mt-5'>
        <h1>Welcome to the React Bookmark Application!</h1>
        <h3>Top 5 most bookmarked links</h3>
        <table className='table table-bordered table-hover'>
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                {urls.map(u => {
                    return <tr>
                        <td>
                            <a href={`${u.url}`}>{u.url}</a>
                        </td>
                        <td>{u.count}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>;
}

export default Home;