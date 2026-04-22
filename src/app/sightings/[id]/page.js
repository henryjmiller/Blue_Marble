// Detail page for a single wildlife sighting
import { getCreaturesContainer, getSightingsContainer } from "@/lib/cosmos";
import SightingDetail from "@/components/Sightings/SightingDetail/SightingDetail";

export default async function SightingDetailPage({ params }) {
    const { id } = await params;

    // fetch the sighting by querying for its ID
    const sightingsContainer = await getSightingsContainer();
    const { resources: sightings } = await sightingsContainer.items
        .query(`SELECT * FROM c WHERE c.id = '${id}'`)
        .fetchAll();

    const sighting = sightings[0];

    // fetch the matching creature using the creature name from the sighting
    const creaturesContainer = await getCreaturesContainer();
    const { resources: creatures } = await creaturesContainer.items
        .query(`SELECT * FROM c WHERE c.name = '${sighting.creatureName}'`)
        .fetchAll();

    const creature = creatures[0] || null;

    return <SightingDetail sighting={sighting} creature={creature} />;
}