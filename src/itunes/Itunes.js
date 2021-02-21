import {
    Button,
    CircularProgress,
    Input, 
    Stack,
    Tag,
} from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import {useDebounce} from "../hooks";
import {ItunesTable} from "../itunesTable";

// https://itunes.apple.com/search?term=harry&entity=ebook

async function fetchBooks({ searchTermInput, setResults, setIsLoading }) {
    if (searchTermInput === '') {
        return;
    }

    setIsLoading(true);
    try {
        const response = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(
                searchTermInput
            )}&entity=ebook`
        );
        const data = await response.json();

        setResults(data.results);
    } finally {
        setIsLoading(false);
    }
}

const words = ['paris', 'barcelona', 'berlin', 'tokyo', 'rome'];
function getSuggestions(searchTerm) {
    if (!searchTerm) {
        return [];
    }
    return words.filter((word) => word.startsWith(searchTerm));
}

export function Itunes() {
    const [results, setResults] = useState([]);
    const [searchTermInput, setSearchTermInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const debouncedSearchTerm = useDebounce(searchTermInput,500);

    useEffect(() => {
        fetchBooks({
            searchTermInput: debouncedSearchTerm,
            setResults,
            setIsLoading,
        });
    }, [debouncedSearchTerm]);

    const suggestionsForInput = getSuggestions(searchTermInput);
    useEffect(() => {
        setSuggestions(suggestionsForInput);
    }, [suggestionsForInput.join('')]); 

    return (
        <Stack>
            <Stack direction="row">
                <Input
                    value={searchTermInput}
                    onChange={(event) => setSearchTermInput(event.target.value)}
                />
                 {isLoading && (
                    <CircularProgress
                        isIndeterminate
                        color="green.300"
                        size={10}
                    />
                )}
                <Button
                    colorScheme="blue"
                    onClick={() =>
                        fetchBooks({
                            searchTermInput,
                            setResults,
                            setIsLoading,
                        })
                    }
                >
                    Search
                </Button>
            </Stack>
            <Stack direction="row">
                {suggestions.map((suggestion) => (
                    <Tag key={suggestion}>{suggestion}</Tag>
                ))}
            </Stack>
            <ItunesTable results={results|| []} />
        </Stack>
    );
}

