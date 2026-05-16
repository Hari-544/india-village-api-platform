 'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

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

    useEffect(() => {
        setLoading(true);
        axios
            .get('/api/location/states')
            .then((res) => {
                setStates(res.data);
                setError('');
            })
            .catch((err) => {
                setError('Failed to load states');
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);

    const loadDistricts = async (state: any) => {
        if (!state) {
            setDistricts([]);
            setSubdistricts([]);
            setVillages([]);
            setSelectedState('');
            return;
        }
        try {
            setLoading(true);
            const res = await axios.get(`/api/location/districts/${encodeURIComponent(state)}`);
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

    const loadSubdistricts = async (district: any) => {
        if (!district) {
            setSubdistricts([]);
            setVillages([]);
            setSelectedDistrict('');
            return;
        }
        try {
            setLoading(true);
            const res = await axios.get(`/api/location/subdistricts/${encodeURIComponent(district)}`);
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

    const loadVillages = async (subdistrict: any) => {
        if (!subdistrict) {
            setVillages([]);
            setSelectedSubdistrict('');
            return;
        }
        try {
            setLoading(true);
            const res = await axios.get(`/api/location/villages/${encodeURIComponent(subdistrict)}`);
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

    const searchVillage = async (value: any) => {
        setSearch(value);

        if (value.length < 2) {
            setSearchResults([]);
            return;
        }

        try {
            setLoading(true);
            const res = await axios.get(`/api/location/search?q=${encodeURIComponent(value)}`);
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
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white" suppressHydrationWarning>
            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                🗺️ India Geo API
                            </div>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-slate-300 hover:text-white transition duration-200 hover:underline underline-offset-4">
                                Dashboard
                            </a>
                            <a href="#" className="text-slate-300 hover:text-white transition duration-200 hover:underline underline-offset-4">
                                Documentation
                            </a>
                            <a href="#" className="text-slate-300 hover:text-white transition duration-200 hover:underline underline-offset-4">
                                Pricing
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                <div className="max-w-3xl">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                        India Village API Platform
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8">
                        Production-grade SaaS platform providing village-level geographical APIs for India. Search, autocomplete, and hierarchical address APIs for modern applications.
                    </p>
                </div>

                {/* STATS SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
                    {['6+ Lakh Villages', '700+ Districts', 'Fast REST APIs', 'Production Ready'].map((item, index) => (
                        <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-800 hover:border-slate-600 transition duration-300 transform hover:scale-105">
                            <p className="text-xl font-semibold text-cyan-300">{item}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ERROR ALERT */}
            {error && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-300">⚠️ {error}</div>
                </div>
            )}

            {/* LOADING INDICATOR */}
            {loading && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                    <div className="flex items-center space-x-2 text-cyan-400">
                        <div className="animate-spin h-5 w-5 border border-cyan-400 border-t-transparent rounded-full"></div>
                        <span>Loading...</span>
                    </div>
                </div>
            )}

            {/* SEARCH SECTION */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold mb-8 text-cyan-300">Village Search</h2>

                <div className="mb-8">
                    <input type="text" placeholder="Search for villages..." value={search} onChange={(e) => searchVillage(e.target.value)} className="w-full md:w-96 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition duration-200" />
                </div>

                {search.length >= 2 && searchResults.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {searchResults.map((item, index) => (
                            <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:bg-slate-800 hover:border-cyan-500/50 transition duration-300 cursor-pointer">
                                <h3 className="text-lg font-semibold text-cyan-300 mb-2">{item.village}</h3>
                                <p className="text-slate-400 text-sm"><span className="text-slate-500">📍</span> {item.sub_district}, {item.district}, {item.state}</p>
                            </div>
                        ))}
                    </div>
                )}

                {search.length >= 2 && searchResults.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-slate-400">No villages found. Try a different search term.</p>
                    </div>
                )}
            </div>

            {/* HIERARCHICAL SELECTION SECTION */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold mb-8 text-cyan-300">Hierarchical Selection</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition duration-300">
                        <label className="block text-sm font-medium text-slate-300 mb-3">State</label>
                        <select value={selectedState} onChange={(e) => loadDistricts(e.target.value)} disabled={loading || states.length === 0} className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            <option value="">Select State</option>
                            {states.map((item, index) => (
                                <option key={index} value={item.state}>{item.state}</option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition duration-300">
                        <label className="block text-sm font-medium text-slate-300 mb-3">District</label>
                        <select value={selectedDistrict} onChange={(e) => loadSubdistricts(e.target.value)} disabled={loading || districts.length === 0} className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            <option value="">Select District</option>
                            {districts.map((item, index) => (
                                <option key={index} value={item.district}>{item.district}</option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition duration-300">
                        <label className="block text-sm font-medium text-slate-300 mb-3">Subdistrict</label>
                        <select value={selectedSubdistrict} onChange={(e) => loadVillages(e.target.value)} disabled={loading || subdistricts.length === 0} className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            <option value="">Select Subdistrict</option>
                            {subdistricts.map((item, index) => (
                                <option key={index} value={item.sub_district}>{item.sub_district}</option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition duration-300">
                        <label className="block text-sm font-medium text-slate-300 mb-3">Village</label>
                        <select disabled={loading || villages.length === 0} className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            <option value="">Select Village</option>
                            {villages.map((item, index) => (
                                <option key={index} value={item.village}>{item.village}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {villages.length > 0 && (
                    <div className="mt-8">
                        <p className="text-slate-400 mb-4">Found <span className="text-cyan-300 font-semibold">{villages.length}</span> villages</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-2">
                            {villages.map((item, index) => (
                                <div key={index} className="bg-slate-700/30 border border-slate-600 rounded-lg p-4 hover:bg-slate-700/50 transition duration-200">
                                    <p className="text-white font-medium">{item.village}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* API DOCUMENTATION */}
            <div style={{ padding: '50px' }}>
                <h1 style={{ marginBottom: '30px' }}>API Documentation</h1>

                <div style={{ background: '#1e293b', padding: '25px', borderRadius: '12px', marginBottom: '25px' }}>
                    <h2>Get All States</h2>
                    <p style={{ color: '#94a3b8' }}>Fetch all available states in India.</p>
                    <div style={{ background: '#0f172a', padding: '15px', borderRadius: '8px', marginTop: '15px', overflowX: 'auto' }}>GET /api/location/states</div>
                </div>

                <div style={{ background: '#1e293b', padding: '25px', borderRadius: '12px', marginBottom: '25px' }}>
                    <h2>Get Districts</h2>
                    <p style={{ color: '#94a3b8' }}>Fetch districts by state name.</p>
                    <div style={{ background: '#0f172a', padding: '15px', borderRadius: '8px', marginTop: '15px', overflowX: 'auto' }}>GET /api/location/districts/ANDHRA%20PRADESH</div>
                </div>

                <div style={{ background: '#1e293b', padding: '25px', borderRadius: '12px' }}>
                    <h2>Village Search API</h2>
                    <p style={{ color: '#94a3b8' }}>Search villages with autocomplete support.</p>
                    <div style={{ background: '#0f172a', padding: '15px', borderRadius: '8px', marginTop: '15px', overflowX: 'auto' }}>GET /api/location/search?q=ram</div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="border-t border-slate-800 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <p className="text-slate-500 text-center">© 2024 India Village API Platform. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
