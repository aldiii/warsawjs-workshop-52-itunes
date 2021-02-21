import {
    Image,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react';
import {DescriptionModal} from "../descriptionModal";


export function ItunesTable({ results }) {
    return (
        <Table variant="simple">
            <TableCaption>iTunes Ebooks</TableCaption>
            <Thead>
                <Tr>
                    <Th>Artwork</Th>
                    <Th>Name</Th>
                    <Th isNumeric>Price</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {results.map((result) => (
                    <Tr key={result.trackId}>
                        <Td>
                            <Image src={result.artworkUrl60} />
                        </Td>
                        <Td>{result.trackName}</Td>
                        <Td isNumeric>{!result.price? "free" :result.price}</Td>
                        <Td>
                            <DescriptionModal result={result} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}