import EventForm from "@/components/modules/event/EventForm";

interface EditEventPageProps {
    params: {
        id: string;
    };
}

async function EditEventPage({ params }: EditEventPageProps) {
    // In a real app, fetch event data here
    // For now, the EventForm will handle fetching if needed

    return (
        <div>
            <EventForm isEdit={true} />
        </div>
    );
}

export default EditEventPage;
