/*
TypeScript type for the following JSON:

{
    "sonas": [
        {
            "name": "Example Fursona",
            "pronouns": "They/Them",
            "gender": "Nonbinary",
            "species": "Species",
            "description": "A description of the fursona, max 250 characters",
            "ref": "https://example.com/ref",
            "refAlt": "Some alt text describing the ref sheet.",
            "avatar": "http://example.com/avatar.png",
            "avatarAlt": "Some alt text describing the avatar.",
            "age": 25,
            "birthdate": "1996-01-01T20:20:39+00:00",
            "colors": [
                "#ff0000",
                "#0f0",
                "#00f"
            ],
            "gallery": [
              {
                "image": "http://example.com/image.png",
                "imageAlt": "Some alt text describing the image.",
                "imageAttribution": "An attribution for the image. Such as a link to the artist.",
                "description": "Some description of the image."
              }
            ]
        }
    ]
}
*/
export interface FursonaSchema {
	sonas: Sona[];
}

export interface Sona {
	name?: string;
	pronouns?: string;
	gender?: string;
	species?: string;
	description?: string;
	ref?: string;
	refAlt?: string;
	avatar?: string;
	avatarAlt?: string;
	age?: number;
	birthdate?: string;
	colors?: string[];
	gallery?: GalleryItem[];
}

export interface GalleryItem {
	image: string;
	imageAlt?: string;
	imageAttribution?: string;
	description?: string;
}

// Validate fursona
export function validateFursona(fursona: Sona): string[] {
	let reasons = [];
	if (fursona.description && fursona.description.length > 250) reasons.push('Fursona description is too long');
	if (fursona.ref && !isURL(fursona.ref)) reasons.push('Fursona ref is not a valid URL');
	if (fursona.avatar && !isURL(fursona.avatar)) reasons.push('Fursona avatar is not a valid URL');
	if (fursona.age && fursona.age < 0) reasons.push('Fursona age is negative');
	if (fursona.colors && !Array.isArray(fursona.colors))
		reasons.push('Fursona colors is not an array');
	if (fursona.colors && fursona.colors.some((color) => !isColor(color)))
		reasons.push('Fursona colors contains an invalid color');
	if (fursona.gallery) {
		if (!Array.isArray(fursona.gallery)) reasons.push('Gallery must be an array');
		else reasons = reasons.concat(fursona.gallery.map(validateGalleryItem).flat());
	}
	return reasons;
}

// Validate GalleryItem
export function validateGalleryItem(galleryItem: GalleryItem): string[] {
	let reasons = [];
	if (!isURL(galleryItem.image)) reasons.push('Gallery item image is not a valid URL');
	if (galleryItem.description && galleryItem.description.length > 250) reasons.push('Gallery item description is too long');
	return reasons;
}

// Validate fursona schema
export function validateFursonaSchema(fursonaSchema: FursonaSchema): boolean {
	if (!fursonaSchema.sonas) return false;
	if (!Array.isArray(fursonaSchema.sonas)) return false;
	if (fursonaSchema.sonas.length > 10) return false;
	if (fursonaSchema.sonas.some((sona) => !validateFursona(sona))) return false;
	return true;
}

function isColor(color: string): boolean {
	return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/i.test(color);
}

function isURL(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch (err) {
		return false;
	}
}
