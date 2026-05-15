export const HALLUCINATION_RULES = [
    {
        name: 'useAsyncEffect',
        message: 'useAsyncEffect is not a built-in React hook.',
        suggestion: 'Use useEffect with an internal async function or a community library hook.',
        exampleBad: 'useAsyncEffect(async () => { ... }, []);',
        exampleGood: 'useEffect(() => { async function run() { ... }; run(); }, []);',
    },
    {
        name: 'useFetch',
        message: 'useFetch is not a built-in React hook.',
        suggestion: 'Use a library like react-query, swr, or implement a custom hook.',
        exampleBad: 'const { data } = useFetch("/api/data");',
        exampleGood: 'const { data } = useSWR("/api/data", fetcher);',
    },
    {
        name: 'usePromise',
        message: 'usePromise is not a built-in React hook.',
        suggestion: 'Use useEffect or a specialized library hook.',
        exampleBad: 'const result = usePromise(myPromise);',
        exampleGood: 'const [result, setResult] = useState(); useEffect(() => { myPromise.then(setResult); }, []);',
    },
];
//# sourceMappingURL=hallucination-rules.js.map