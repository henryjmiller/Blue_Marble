const creatures = [
    {
        id: "atlantic-salmon",
        type: "creature",
        name: "Atlantic Salmon",
        scientificName: "Salmo salar",
        category: "Fish",
        conservationStatus: "Near Threatened",
        populationTrend: "Decreasing",
        description: "A remarkable migratory fish that spends its adult life at sea before returning to the exact river where it was born to spawn. Once abundant across UK rivers, populations have fallen sharply due to pollution, habitat loss, and barriers to migration.",
        funFact: "Atlantic salmon can leap up to 3.5 metres out of the water to climb waterfalls or jump over rocks! (That's twice the height of an average human adult!)",
        image: "/creatures/atlantic-salmon.jpg"
    },
    {
        id: "european-eel",
        type: "creature",
        name: "European Eel",
        scientificName: "Anguilla anguilla",
        category: "Fish",
        conservationStatus: "Critically Endangered",
        populationTrend: "Decreasing",
        description: "A snake like fish that lives in UK rivers and lakes for up to 20 years before making an epic journey across the Atlantic Ocean to breed. Numbers have collapsed by around 90% since the 1970s, making it one of Europe's most endangered fish.",
        funFact: "European eels are so strong at swimming (and climbing) that they've been known to slither out of the water to feed on slugs and worms!",
        image: "/creatures/european-eel.jpg"
    },
    {
        id: "common-toad",
        type: "creature",
        name: "Common Toad",
        scientificName: "Bufo bufo",
        category: "Amphibian",
        conservationStatus: "Least Concern",
        populationTrend: "Decreasing",
        description: "A familiar garden visitor with warty, dry skin that crawls rather than hops. Each spring, common toads migrate in huge numbers back to the pond where they were born to breed, sometimes crossing busy roads in the process.",
        funFact: "These amphibians would rather crawl then hop, so you won't see them jump, but you will see LOTS of them together in breeding season!",
        image: "/creatures/common-toad.jpg"
    },
    {
        id: "great-crested-newt",
        type: "creature",
        name: "Great Crested Newt",
        scientificName: "Triturus cristatus",
        category: "Amphibian",
        conservationStatus: "Least Concern",
        populationTrend: "Decreasing",
        description: "The UK's largest newt, with dramatic warty black skin, white-spotted flanks, and a vivid orange belly. Males grow a striking jagged crest along their back during breeding season. Strictly protected under UK law.",
        funFact: "A great crested newt's orange belly pattern is as unique as a human fingerprint, no two are the same!",
        image: "/creatures/great-crested-newt.jpg"
    },
    {
        id: "eurasian-otter",
        type: "creature",
        name: "Eurasian Otter",
        scientificName: "Lutra lutra",
        category: "Mammal",
        conservationStatus: "Near Threatened",
        populationTrend: "Decreasing",
        description: "A sleek, playful mammal that sits at the top of the river food chain. After near extinction in the UK due to pesticides and habitat loss, otters are slowly making a comeback. Every county in England has confirmed a population.",
        funFact: "Otters hold hands while sleeping so they don't drift apart whilst they snooze!",
        image: "/creatures/eurasian-otter.jpg"
    },
    {
        id: "water-vole",
        type: "creature",
        name: "Water Vole",
        scientificName: "Arvicola amphibius",
        category: "Mammal",
        conservationStatus: "Least Concern",
        populationTrend: "Unknown",
        description: "The water vole is the UK's fastest declining wild mammal. Often known as water-rats, there is no such thing. They live in burrows along riverbanks and are under serious threat from habitat loss and predation by the invasive American mink.",
        funFact: "Water voles like to always eat their food in the same place, leaving big piles of nibbled grass as evidence!",
        image: "/creatures/water-vole.jpg"
    },
    {
        id: "emperor-dragonfly",
        type: "creature",
        name: "Emperor Dragonfly",
        scientificName: "Anax imperator",
        category: "Insect",
        conservationStatus: "Least Concern",
        populationTrend: "Stable",
        description: "The UK's largest dragonfly, a powerful aerial hunter found around ponds, lakes, and slow rivers. Its vivid blue and green body makes it unmistakable on summer days. Dragonfly larvae are fierce underwater predators, feeding on insects, newts, and small fish.",
        funFact: "Small but mighty, Dragonflies catch their prey mid-air with a nearly 97% success rate, they are the best hunters on the planet!",
        image: "/creatures/emperor-dragonfly.jpg"
    },
    {
        id: "white-clawed-crayfish",
        type: "creature",
        name: "White-clawed Crayfish",
        scientificName: "Austropotamobius pallipes",
        category: "Crustacean",
        conservationStatus: "Endangered",
        populationTrend: "Decreasing",
        description: "The UK's only native crayfish, recognisable by its pale undersides and claws. It plays a vital role in river ecosystems but is severely threatened by the invasive American signal crayfish, which carries a plague deadly to this species.",
        funFact: "These interesting crustaceans burst out of their shells when they outgrow them, cracking through to grow a larger skin!",
        image: "/creatures/white-clawed-crayfish.jpg"
    },
    {
        id: "kingfisher",
        type: "creature",
        name: "Kingfisher",
        scientificName: "Alcedo atthis",
        category: "Bird",
        conservationStatus: "Least Concern",
        populationTrend: "Decreasing",
        description: "A flash of vibrant blue along clean rivers and streams, this is one of the UK's most recognisable birds. Kingfishers are a key indicator of river health, as they only thrive where water is clean and fish are plentiful. Strictly protected under UK law.",
        funFact: "To impress a female, a male kingfisher brings her a fish as a gift to eat, they really are the Kings of Fishing!",
        image: "/creatures/kingfisher.jpg"
    },
    {
        id: "freshwater-pearl-mussel",
        type: "creature",
        name: "Freshwater Pearl Mussel",
        scientificName: "Margaritifera margaritifera",
        category: "Mollusc",
        conservationStatus: "Endangered",
        populationTrend: "Decreasing",
        description: "One of the longest-lived invertebrates on Earth, capable of surviving over 100 years. Young mussels spend their first year attached to the gills of a salmon, hitching a ride upstream. Now critically threatened by water pollution and habitat loss.",
        funFact: "Freshwater pearl mussels spend their first few months clinging onto a salmon's gills for a free ride, and they can live up to 100 years old!",
        image: "/creatures/freshwater-pearl-mussel.jpg"
    }
];

module.exports = creatures;