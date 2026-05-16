'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE =
'https://village-api-backend-23a2.onrender.com/api/location';

export default function Page() {

    const [states, setStates] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [subdistricts, setSubdistricts] = useState<any[]>([]);
    const [villages, setVillages] = useState<any[]>([]);

    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedSubdistrict, setSelectedSubdistrict] = useState('');

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // LOAD STATES

    useEffect(() => {

        setLoading(true);

        axios
            .get(`${API_BASE}/states`)
            .then((res) => {

                setStates(res.data);
                setError('');

            })
            .catch((err) => {

                setError('Failed to load states');
                console.log(err);

            })
            .finally(() => {

                setLoading(false);

            });

    }, []);

    // LOAD DISTRICTS

    const loadDistricts = async (state:any) => {

        if (!state) {

            setDistricts([]);
            setSubdistricts([]);
            setVillages([]);
            setSelectedState('');

            return;
        }

        try {

            setLoading(true);

            const res = await axios.get(
                `${API_BASE}/districts/${encodeURIComponent(state)}`
            );

            setDistricts(res.data);

            setSubdistricts([]);
            setVillages([]);

            setSelectedState(state);

            setSelectedDistrict('');
            setSelectedSubdistrict('');

            setError('');

        } catch (err) {

            setError('Failed to load districts');
            console.log(err);

        } finally {

            setLoading(false);

        }
    };

    // LOAD SUBDISTRICTS

    const loadSubdistricts = async (district:any) => {

        if (!district) {

            setSubdistricts([]);
            setVillages([]);
            setSelectedDistrict('');

            return;
        }

        try {

            setLoading(true);

            const res = await axios.get(
                `${API_BASE}/subdistricts/${encodeURIComponent(district)}`
            );

            setSubdistricts(res.data);

            setVillages([]);

            setSelectedDistrict(district);

            setSelectedSubdistrict('');

            setError('');

        } catch (err) {

            setError('Failed to load subdistricts');
            console.log(err);

        } finally {

            setLoading(false);

        }
    };

    // LOAD VILLAGES

    const loadVillages = async (subdistrict:any) => {

        if (!subdistrict) {

            setVillages([]);
            setSelectedSubdistrict('');

            return;
        }

        try {

            setLoading(true);

            const res = await axios.get(
                `${API_BASE}/villages/${encodeURIComponent(subdistrict)}`
            );

            setVillages(res.data);

            setSelectedSubdistrict(subdistrict);

            setError('');

        } catch (err) {

            setError('Failed to load villages');
            console.log(err);

        } finally {

            setLoading(false);

        }
    };

    // SEARCH VILLAGES

    const searchVillage = async (value:any) => {

        setSearch(value);

        if (value.length < 2) {

            setSearchResults([]);

            return;
        }

        try {

            setLoading(true);

            const res = await axios.get(
                `${API_BASE}/search?q=${encodeURIComponent(value)}`
            );

            setSearchResults(res.data);

            setError('');

        } catch (err) {

            setError('Search failed. Please try again.');
            console.log(err);

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

            {/* NAVBAR */}

            <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex justify-between items-center h-16">

                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            🗺️ India Geo API
                        </div>

                    </div>

                </div>

            </nav>

            {/* HERO */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">

                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    India Village API Platform
                </h1>

                <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8">
                    Production-grade SaaS platform providing village-level geographical APIs for India.
                </p>

                {/* STATS */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">

                    {
                        [
                            '6+ Lakh Villages',
                            '700+ Districts',
                            'Fast REST APIs',
                            'Production Ready'
                        ].map((item, index) => (

                            <div
                                key={index}
                                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6"
                            >

                                <p className="text-xl font-semibold text-cyan-300">
                                    {item}
                                </p>

                            </div>

                        ))
                    }

                </div>

            </div>

            {/* ERROR */}

            {
                error && (

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">

                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-300">
                            ⚠️ {error}
                        </div>

                    </div>

                )
            }

            {/* LOADING */}

            {
                loading && (

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">

                        <div className="flex items-center space-x-2 text-cyan-400">

                            <div className="animate-spin h-5 w-5 border border-cyan-400 border-t-transparent rounded-full"></div>

                            <span>Loading...</span>

                        </div>

                    </div>

                )
            }

            {/* SEARCH */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <h2 className="text-3xl font-bold mb-8 text-cyan-300">
                    Village Search
                </h2>

                <input
                    type="text"
                    placeholder="Search for villages..."
                    value={search}
                    onChange={(e) => searchVillage(e.target.value)}
                    className="w-full md:w-96 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                />

                <br /><br />

                {
                    searchResults.map((item, index) => (

                        <div
                            key={index}
                            className="bg-slate-800 border border-slate-700 rounded-lg p-5 mb-4"
                        >

                            <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                                {item.village}
                            </h3>

                            <p className="text-slate-400 text-sm">
                                {item.sub_district},
                                {' '}
                                {item.district},
                                {' '}
                                {item.state}
                            </p>

                        </div>

                    ))
                }

            </div>

            {/* DROPDOWNS */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <h2 className="text-3xl font-bold mb-8 text-cyan-300">
                    Hierarchical Selection
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* STATE */}

                    <select
                        value={selectedState}
                        onChange={(e) => loadDistricts(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white"
                    >

                        <option value="">
                            Select State
                        </option>

                        {
                            states.map((item, index) => (

                                <option
                                    key={index}
                                    value={item.state}
                                >
                                    {item.state}
                                </option>

                            ))
                        }

                    </select>

                    {/* DISTRICT */}

                    <select
                        value={selectedDistrict}
                        onChange={(e) => loadSubdistricts(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white"
                    >

                        <option value="">
                            Select District
                        </option>

                        {
                            districts.map((item, index) => (

                                <option
                                    key={index}
                                    value={item.district}
                                >
                                    {item.district}
                                </option>

                            ))
                        }

                    </select>

                    {/* SUBDISTRICT */}

                    <select
                        value={selectedSubdistrict}
                        onChange={(e) => loadVillages(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white"
                    >

                        <option value="">
                            Select Subdistrict
                        </option>

                        {
                            subdistricts.map((item, index) => (

                                <option
                                    key={index}
                                    value={item.sub_district}
                                >
                                    {item.sub_district}
                                </option>

                            ))
                        }

                    </select>

                    {/* VILLAGES */}

                    <select
                        className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white"
                    >

                        <option value="">
                            Select Village
                        </option>

                        {
                            villages.map((item, index) => (

                                <option
                                    key={index}
                                    value={item.village}
                                >
                                    {item.village}
                                </option>

                            ))
                        }

                    </select>

                </div>

            </div>

        </div>

    );
}