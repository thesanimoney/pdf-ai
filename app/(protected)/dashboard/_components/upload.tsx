import TypographyH1 from "@/components/ui/typographyh1";
import UploadButton from "@/components/dashboard/uploadButton";

function Upload() {
    return <>
        <div className={'flex justify-between items-center border-b pb-10'}>
            <TypographyH1>My files</TypographyH1>
            <UploadButton/>
        </div>
    </>
}

export default Upload;