import {
    Button,
    Image,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { DescriptionModal } from '../descriptionModal';
import { useState } from 'react';

function sortTable(sortedField, results) {
    if (sortedField) {
        return results.sort((a, b) => {
            if (a[sortedField] < b[sortedField]) return -1;
            else if (a[sortedField] < b[sortedField]) return 1;
            else return 0;
        });
    } else {
        return [...results];
    }
}

export function ItunesTable({ results }) {
    const [sortedField, setSortedField] = useState('');
    const sortedResults = sortTable(sortedField, results);
    console.log(sortedResults);
    return (
        <Table variant="simple">
            <TableCaption>iTunes Ebooks</TableCaption>
            <Thead>
                <Tr>
                    <Th>
                        <Button colorScheme="whiteAlpha" variant="link" sx={{ textTransform:"uppercase" }}>
                            Artwork
                        </Button>
                    </Th>
                    <Th>
                        <Button
                            colorScheme="whiteAlpha"
                            variant="link"
                            onClick={() => setSortedField('trackName')}
                            sx={{ textTransform:"uppercase" }}
                        >
                            Name
                        </Button>
                    </Th>
                    <Th isNumeric>
                        <Button
                            colorScheme="whiteAlpha"
                            variant="link"
                            onClick={() => setSortedField('price')}
                            sx={{ textTransform:"uppercase" }}
                        >
                            Price
                        </Button>
                    </Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {sortedResults.map((result) => (
                    <Tr key={result.trackId}>
                        <Td>
                            <Image src={result.artworkUrl60} />
                        </Td>
                        <Td>{result.trackName}</Td>
                        <Td isNumeric>
                            {!result.formattedPrice
                                ? 'unknown'
                                : result.formattedPrice}
                        </Td>
                        <Td>
                            <DescriptionModal result={result} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}
