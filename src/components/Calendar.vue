<script setup lang="ts">
const props = defineProps({
    fixture: null,
})

const formatDate = (dateString: any) => {
    const formattedDate = new Date(dateString).toISOString().replace(/[-_:]|\.\d{3}/g, '');
    // return `${dateString}T090000Z`; // Set to 9:00 AM UTC on the selected date
    return formattedDate
};

const endDateCalc = (fdate: string, comp: string) => {
    let addValue = 1;

console.log(fdate)
    if (comp) {
        switch (true) {
            case comp.includes('State League Men'):
                addValue = 1
                break;
            case comp.includes('Junior'):
                addValue = 1.5
                break;
        }

    }

    let newDate = new Date(fdate)
    newDate.setHours(newDate.getHours() + addValue);
    return newDate;

}

const downloadIcs = () => {
    // console.log('click a doodle')
    // console.log(props.fixture)
    // console.log(props.fixture.attributes)
    const endDate = endDateCalc(props.fixture.attributes.date, props.fixture.attributes.competition_name)

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//ElwoodCitySC//EN',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@vuecalculator.com`,
        `DTSTART:${formatDate(props.fixture.attributes.date)}`,
        `DTEND:${formatDate(endDate)}`,
        `SUMMARY:${props.fixture.attributes.name}`,
        `DESCRIPTION:${props.fixture.attributes.name} | ${props.fixture.attributes.competition_name}`,
        `LOCATION:https://maps.google.com/maps?z=10&amp;q=${props.fixture.attributes.ground_latitude}+${props.fixture.attributes.ground_longitude}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    // console.log(icsContent)
    // Create Blob and download link
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', `${props.fixture.attributes.name}.ics`);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

</script>

<template>

    <button @click="downloadIcs">
        <v-icon name="co-calendar" class="svg-inline--fa fa-location-dot" />
    </button>


</template>