import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
const ImageUpload = ({
    className,
    progress,
    onChange,
    imageURL,
    imageTitle,
    handleDeleteImage,
    ...props
}) => {
    return (
        <label className="relative rounded-md overflow-hidden flex items-center justify-center min-h-[200px] bg-gray-100 w-full group">
            <input
                {...props}
                type="file"
                className="hidden-input"
                onChange={(e) => {
                    onChange(e);
                }}
            />
            {imageURL && (
                <button
                    onClick={handleDeleteImage}
                    type="button"
                    className="absolute z-10 flex items-center justify-center invisible w-16 h-16 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:visible">
                    <TrashIcon className="w-10 h-10 text-red-700"></TrashIcon>
                </button>
            )}

            {!imageURL ? (
                <div
                    className={`${className} flex flex-col items-center gap-y-3`}>
                    {progress === 0 && (
                        <img
                            className="w-[100px] h-[100px] object-contain"
                            srcSet="/monkey.png 3x"
                            alt=""
                        />
                    )}
                    {progress !== 0 && (
                        <div className="w-16 h-16 border-8 border-green-700 rounded-full border-t-transparent animate-spin"></div>
                    )}
                    <p className="font-semibold">
                        {!!imageTitle ? imageTitle : "Choose Image"}
                    </p>
                    <div
                        className="absolute bottom-0 left-0 h-1 transition-all bg-primary"
                        style={{
                            width: `${progress}%`,
                        }}></div>
                </div>
            ) : (
                <img
                    className="object-cover w-full h-full"
                    src={imageURL}
                    alt=""
                />
            )}
        </label>
    );
};

export default ImageUpload;
