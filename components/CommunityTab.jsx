import Thread from './Thread'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const CommunityTab = ({ parsedContent, id }) => {
    return (
        <>
            <Tabs defaultValue="detail">
                <TabsList className="tab" >
                    <TabsTrigger value="detail" className="tab rounded-2xl" >
                        <h3 className="text-30-bold-light" > Detail </h3>
                    </TabsTrigger>
                    <TabsTrigger value="thread" className="tab rounded-2xl" >
                        <h3 className="text-30-bold-light" > Threads </h3>
                    </TabsTrigger>
                    <TabsTrigger value="members" className="tab rounded-2xl" >
                        <h3 className="text-30-bold-light" > Members </h3>
                    </TabsTrigger>
                </TabsList>


                <TabsContent value="detail">
                    {parsedContent ? (
                        <article className="prose max-w-full font-work-sans break-all mt-8" dangerouslySetInnerHTML={{ __html: parsedContent }} />
                    ) : (<p className="no-result" > No details provided </p>)}
                </TabsContent>

                <TabsContent value="thread">
                    <Thread id={id} />
                </TabsContent>
            </Tabs>

        </>
    )
}

export default CommunityTab
