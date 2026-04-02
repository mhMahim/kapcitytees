import type { StaticImageData } from "next/image";

const LOCAL_CART_STORAGE_KEY = "kapcitytees-local-cart";
const LOCAL_CART_UPDATED_EVENT = "kapcitytees-local-cart-updated";
export const CHECKOUT_CONTEXT_STORAGE_KEY = "kapcitytees-checkout-context";

const DEFAULT_PRODUCT_IMAGE = "https://i.ibb.co.com/27rvh0W6/Rectangle-55.png";

export interface LocalCartItem {
	id: string | number;
	name: string;
	category: string;
	price: number;
	quantity: number;
	image: string;
	slug?: string;
}

export interface LocalCheckoutItem {
	product_id: string | number;
	product_name: string;
	product_category: string;
	product_image: string;
	product_slug: string;
	unit_price: number;
	quantity: number;
	item_total: number;
}

export interface LocalCheckoutDetails {
	items: LocalCheckoutItem[];
	subtotal: number;
	total_items: number;
}

interface AddToLocalCartInput {
	id: string | number;
	name: string;
	category?: string;
	price: number;
	image: string | StaticImageData;
	slug?: string;
	quantity?: number;
}

const canUseStorage = () => typeof window !== "undefined";

const parseNumber = (value: unknown, fallback: number) => {
	const numericValue = Number(value);
	return Number.isFinite(numericValue) ? numericValue : fallback;
};

const normalizeQuantity = (value: unknown, fallback = 1) => {
	const numericValue = Math.floor(parseNumber(value, fallback));
	return numericValue > 0 ? numericValue : 1;
};

const normalizeImage = (value: string | StaticImageData | unknown) => {
	if (typeof value === "string" && value.trim().length > 0) {
		return value;
	}

	if (
		typeof value === "object" &&
		value !== null &&
		"src" in value &&
		typeof (value as { src?: unknown }).src === "string"
	) {
		return (value as { src: string }).src;
	}

	return DEFAULT_PRODUCT_IMAGE;
};

const normalizeCategory = (value: unknown) => {
	if (typeof value === "string" && value.trim().length > 0) {
		return value;
	}

	return "Product";
};

const readCartFromStorage = (): LocalCartItem[] => {
	if (!canUseStorage()) {
		return [];
	}

	const rawCart = localStorage.getItem(LOCAL_CART_STORAGE_KEY);

	if (!rawCart) {
		return [];
	}

	try {
		const parsedCart = JSON.parse(rawCart);

		if (!Array.isArray(parsedCart)) {
			return [];
		}

		const normalizedItems: LocalCartItem[] = [];

		for (const item of parsedCart) {
			if (!item || typeof item !== "object") {
				continue;
			}

			const record = item as Record<string, unknown>;
			const id = record.id;
			const name = record.name;

			if (
				(typeof id !== "string" && typeof id !== "number") ||
				typeof name !== "string" ||
				name.trim().length === 0
			) {
				continue;
			}

			normalizedItems.push({
				id,
				name,
				category: normalizeCategory(record.category),
				price: parseNumber(record.price, 0),
				quantity: normalizeQuantity(record.quantity),
				image: normalizeImage(record.image),
				slug:
					typeof record.slug === "string" && record.slug.trim().length > 0
						? record.slug
						: undefined,
			});
		}

		return normalizedItems;
	} catch {
		return [];
	}
};

const saveCartToStorage = (items: LocalCartItem[]) => {
	if (!canUseStorage()) {
		return;
	}

	localStorage.setItem(LOCAL_CART_STORAGE_KEY, JSON.stringify(items));
	window.dispatchEvent(new Event(LOCAL_CART_UPDATED_EVENT));
};

export const subscribeToLocalCart = (callback: () => void) => {
	if (!canUseStorage()) {
		return () => {};
	}

	const onCartUpdate = () => {
		callback();
	};

	window.addEventListener(LOCAL_CART_UPDATED_EVENT, onCartUpdate);
	window.addEventListener("storage", onCartUpdate);

	return () => {
		window.removeEventListener(LOCAL_CART_UPDATED_EVENT, onCartUpdate);
		window.removeEventListener("storage", onCartUpdate);
	};
};

export const getLocalCartItems = (): LocalCartItem[] => {
	return readCartFromStorage();
};

export const getLocalCartSnapshot = (): string => {
	if (!canUseStorage()) {
		return "[]";
	}

	return localStorage.getItem(LOCAL_CART_STORAGE_KEY) ?? "[]";
};

export const addToLocalCart = (input: AddToLocalCartInput): LocalCartItem[] => {
	const existingItems = readCartFromStorage();
	const quantityToAdd = normalizeQuantity(input.quantity);
	const itemKey = String(input.id);
	const existingItemIndex = existingItems.findIndex(
		(item) => String(item.id) === itemKey,
	);

	if (existingItemIndex >= 0) {
		const updatedItems = existingItems.map((item, index) =>
			index === existingItemIndex
				? {
						...item,
						name: input.name,
						category: normalizeCategory(input.category),
						price: parseNumber(input.price, item.price),
						image: normalizeImage(input.image),
						slug: input.slug || item.slug,
						quantity: item.quantity + quantityToAdd,
					}
				: item,
		);

		saveCartToStorage(updatedItems);
		return updatedItems;
	}

	const nextItems = [
		...existingItems,
		{
			id: input.id,
			name: input.name,
			category: normalizeCategory(input.category),
			price: parseNumber(input.price, 0),
			quantity: quantityToAdd,
			image: normalizeImage(input.image),
			slug: input.slug,
		},
	];

	saveCartToStorage(nextItems);
	return nextItems;
};

export const updateLocalCartQuantity = (
	id: string | number,
	action: "increment" | "decrement",
): LocalCartItem[] => {
	const existingItems = readCartFromStorage();
	const itemKey = String(id);

	const updatedItems = existingItems.map((item) => {
		if (String(item.id) !== itemKey) {
			return item;
		}

		const nextQuantity =
			action === "increment" ? item.quantity + 1 : Math.max(item.quantity - 1, 1);

		return {
			...item,
			quantity: nextQuantity,
		};
	});

	saveCartToStorage(updatedItems);
	return updatedItems;
};

export const removeLocalCartItem = (id: string | number): LocalCartItem[] => {
	const existingItems = readCartFromStorage();
	const itemKey = String(id);
	const updatedItems = existingItems.filter((item) => String(item.id) !== itemKey);

	saveCartToStorage(updatedItems);
	return updatedItems;
};

export const clearLocalCart = () => {
	if (!canUseStorage()) {
		return;
	}

	localStorage.removeItem(LOCAL_CART_STORAGE_KEY);
	window.dispatchEvent(new Event(LOCAL_CART_UPDATED_EVENT));
};

export const getLocalCheckoutDetails = (): LocalCheckoutDetails => {
	const localItems = readCartFromStorage();

	const checkoutItems = localItems.map((item) => {
		const unitPrice = parseNumber(item.price, 0);
		const quantity = normalizeQuantity(item.quantity);

		return {
			product_id: item.id,
			product_name: item.name,
			product_category: item.category,
			product_image: item.image,
			product_slug: item.slug || "",
			unit_price: unitPrice,
			quantity,
			item_total: Number((unitPrice * quantity).toFixed(2)),
		} satisfies LocalCheckoutItem;
	});

	const subtotal = Number(
		checkoutItems
			.reduce((sum, item) => sum + item.item_total, 0)
			.toFixed(2),
	);

	const totalItems = checkoutItems.reduce((sum, item) => sum + item.quantity, 0);

	return {
		items: checkoutItems,
		subtotal,
		total_items: totalItems,
	};
};
