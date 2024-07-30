import Empty from "@/components/dashboard/empty";
import PdfCard from "@/components/dashboard/pdfCard";
import {getFilesByUserId} from "@/data/files";
import Upload from "@/app/(protected)/dashboard/_components/upload";

async function DashboardPage() {
    const {files, error} = await getFilesByUserId()

    return <>
        <div className={'container space-y-10'}>
            <Upload/>
            <section>
                {files && files.length > 0 ? <ul className={'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}>
                        {files.sort((a, b) =>
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map((item, index) => (
                                <li key={index}>
                                    <PdfCard pdf={item}/>
                                </li>
                            ))}
                    </ul> :
                    <div className={'h-[50vh] flex justify-center items-center'}>
                        <Empty error={error}/>
                    </div>}
            </section>
        </div>
    </>
}

export default DashboardPage;
