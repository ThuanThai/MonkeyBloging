import React from "react";

const ImageUpload = ({
    className,
    progress,
    onChange,
    imageURL,
    imageTitle,
    ...props
}) => {
    return (
        <label className="relative rounded-md overflow-hidden flex items-center justify-center min-h-[200px] bg-gray-100 w-full">
            <input
                {...props}
                type="file"
                className="hidden-input"
                onChange={(e) => {
                    onChange(e);
                }}
            />
            {!imageURL ? (
                <div
                    className={`${className}  flex flex-col items-center gap-y-3`}>
                    <img
                        className="w-[100px] h-[100px] object-contain"
                        srcSet="/monkey.png 3x"
                        alt=""
                    />
                    <p className="font-semibold">
                        {!!imageTitle ? imageTitle : "Choose Image"}
                    </p>
                    <div
                        className="h-1 bg-primary absolute bottom-0 left-0 transition-all"
                        style={{
                            width: `${progress}%`,
                        }}></div>
                </div>
            ) : (
                <img
                    className="w-full h-full object-cover"
                    src={imageURL}
                    alt=""
                />
            )}
        </label>
    );
};

export default ImageUpload;
