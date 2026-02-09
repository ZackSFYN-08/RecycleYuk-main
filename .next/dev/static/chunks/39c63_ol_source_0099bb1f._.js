(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/Source.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
/**
 * @module ol/source/Source
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$Object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/Object.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/proj.js [app-client] (ecmascript) <locals>");
;
;
/**
 * @typedef {'undefined' | 'loading' | 'ready' | 'error'} State
 * State of the source, one of 'undefined', 'loading', 'ready' or 'error'.
 */ /**
 * A function that takes a {@link import("../View.js").ViewStateLayerStateExtent} and returns a string or
 * an array of strings representing source attributions.
 *
 * @typedef {function(import("../View.js").ViewStateLayerStateExtent): (string|Array<string>)} Attribution
 */ /**
 * A type that can be used to provide attribution information for data sources.
 *
 * It represents either
 * a simple string (e.g. `'© Acme Inc.'`)
 * an array of simple strings (e.g. `['© Acme Inc.', '© Bacme Inc.']`)
 * a function that returns a string or array of strings ({@link module:ol/source/Source~Attribution})
 *
 * @typedef {string|Array<string>|Attribution} AttributionLike
 */ /**
 * @typedef {Object} Options
 * @property {AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {import("./Source.js").State} [state='ready'] State.
 * @property {boolean} [wrapX=false] WrapX.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 */ /**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for {@link module:ol/layer/Layer~Layer} sources.
 *
 * A generic `change` event is triggered when the state of the source changes.
 * @abstract
 * @api
 */ class Source extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$Object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    /**
   * @param {Options} options Source options.
   */ constructor(options){
        super();
        /**
     * @protected
     * @type {import("../proj/Projection.js").default|null}
     */ this.projection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])(options.projection);
        /**
     * @private
     * @type {?Attribution}
     */ this.attributions_ = adaptAttributions(options.attributions);
        /**
     * @private
     * @type {boolean}
     */ this.attributionsCollapsible_ = options.attributionsCollapsible ?? true;
        /**
     * This source is currently loading data. Sources that defer loading to the
     * map's tile queue never set this to `true`.
     * @type {boolean}
     */ this.loading = false;
        /**
     * @private
     * @type {import("./Source.js").State}
     */ this.state_ = options.state !== undefined ? options.state : 'ready';
        /**
     * @private
     * @type {boolean}
     */ this.wrapX_ = options.wrapX !== undefined ? options.wrapX : false;
        /**
     * @private
     * @type {boolean}
     */ this.interpolate_ = !!options.interpolate;
        /**
     * @protected
     * @type {function(import("../View.js").ViewOptions):void}
     */ this.viewResolver = null;
        /**
     * @protected
     * @type {function(Error):void}
     */ this.viewRejector = null;
        const self = this;
        /**
     * @private
     * @type {Promise<import("../View.js").ViewOptions>}
     */ this.viewPromise_ = new Promise(function(resolve, reject) {
            self.viewResolver = resolve;
            self.viewRejector = reject;
        });
    }
    /**
   * Get the attribution function for the source.
   * @return {?Attribution} Attribution function.
   * @api
   */ getAttributions() {
        return this.attributions_;
    }
    /**
   * @return {boolean} Attributions are collapsible.
   * @api
   */ getAttributionsCollapsible() {
        return this.attributionsCollapsible_;
    }
    /**
   * Get the projection of the source.
   * @return {import("../proj/Projection.js").default|null} Projection.
   * @api
   */ getProjection() {
        return this.projection;
    }
    /**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   */ getResolutions(projection) {
        return null;
    }
    /**
   * @return {Promise<import("../View.js").ViewOptions>} A promise for view-related properties.
   */ getView() {
        return this.viewPromise_;
    }
    /**
   * Get the state of the source, see {@link import("./Source.js").State} for possible states.
   * @return {import("./Source.js").State} State.
   * @api
   */ getState() {
        return this.state_;
    }
    /**
   * @return {boolean|undefined} Wrap X.
   */ getWrapX() {
        return this.wrapX_;
    }
    /**
   * @return {boolean} Use linear interpolation when resampling.
   */ getInterpolate() {
        return this.interpolate_;
    }
    /**
   * Refreshes the source. The source will be cleared, and data from the server will be reloaded.
   * @api
   */ refresh() {
        this.changed();
    }
    /**
   * Set the attributions of the source.
   * @param {AttributionLike|undefined} attributions Attributions.
   *     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
   *     or `undefined`.
   * @api
   */ setAttributions(attributions) {
        this.attributions_ = adaptAttributions(attributions);
        this.changed();
    }
    /**
   * Set the state of the source.
   * @param {import("./Source.js").State} state State.
   */ setState(state) {
        this.state_ = state;
        this.changed();
    }
}
/**
 * Turns the attributions option into an attributions function.
 * @param {AttributionLike|undefined} attributionLike The attribution option.
 * @return {Attribution|null} An attribution function (or null).
 */ function adaptAttributions(attributionLike) {
    if (!attributionLike) {
        return null;
    }
    if (typeof attributionLike === 'function') {
        return attributionLike;
    }
    if (!Array.isArray(attributionLike)) {
        attributionLike = [
            attributionLike
        ];
    }
    return (frameState)=>attributionLike;
}
const __TURBOPACK__default__export__ = Source;
}),
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/Tile.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TileSourceEvent",
    ()=>TileSourceEvent,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/**
 * @module ol/source/Tile
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$events$2f$Event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/events/Event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/size.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$tilecoord$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/tilecoord.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$tilegrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/tilegrid.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/util.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$Source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/Source.js [app-client] (ecmascript)");
;
;
;
;
;
;
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("./TileEventType").TileSourceEventTypes, TileSourceEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     import("./TileEventType").TileSourceEventTypes, Return>} TileSourceOnSignature
 */ /**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Deprecated.  Use the cacheSize option on the layer instead.
 * @property {number} [tilePixelRatio] TilePixelRatio.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {import("./Source.js").State} [state] State.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] TileGrid.
 * @property {boolean} [wrapX=false] WrapX.
 * @property {number} [transition] Transition.
 * @property {string} [key] Key.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0] ZDirection.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 */ /**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for sources providing images divided into a tile grid.
 *
 * @template {import("../Tile.js").default} [TileType=import("../Tile.js").default]
 * @abstract
 * @api
 */ class TileSource extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$Source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    /**
   * @param {Options} options SourceTile source options.
   */ constructor(options){
        super({
            attributions: options.attributions,
            attributionsCollapsible: options.attributionsCollapsible,
            projection: options.projection,
            state: options.state,
            wrapX: options.wrapX,
            interpolate: options.interpolate
        });
        /***
     * @type {TileSourceOnSignature<import("../events").EventsKey>}
     */ this.on;
        /***
     * @type {TileSourceOnSignature<import("../events").EventsKey>}
     */ this.once;
        /***
     * @type {TileSourceOnSignature<void>}
     */ this.un;
        /**
     * @private
     * @type {number}
     */ this.tilePixelRatio_ = options.tilePixelRatio !== undefined ? options.tilePixelRatio : 1;
        /**
     * @type {import("../tilegrid/TileGrid.js").default|null}
     * @protected
     */ this.tileGrid = options.tileGrid !== undefined ? options.tileGrid : null;
        const tileSize = [
            256,
            256
        ];
        if (this.tileGrid) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSize"])(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), tileSize);
        }
        /**
     * @protected
     * @type {import("../size.js").Size}
     */ this.tmpSize = [
            0,
            0
        ];
        /**
     * @private
     * @type {string}
     */ this.key_ = options.key || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUid"])(this);
        /**
     * @protected
     * @type {import("../Tile.js").Options}
     */ this.tileOptions = {
            transition: options.transition,
            interpolate: options.interpolate
        };
        /**
     * zDirection hint, read by the renderer. Indicates which resolution should be used
     * by a renderer if the views resolution does not match any resolution of the tile source.
     * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
     * will be used. If -1, the nearest higher resolution will be used.
     * @type {number|import("../array.js").NearestDirectionFunction}
     */ this.zDirection = options.zDirection ? options.zDirection : 0;
    }
    /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   */ getGutterForProjection(projection) {
        return 0;
    }
    /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   */ getKey() {
        return this.key_;
    }
    /**
   * Set the value to be used as the key for all tiles in the source.
   * @param {string} key The key for tiles.
   * @protected
   */ setKey(key) {
        if (this.key_ !== key) {
            this.key_ = key;
            this.changed();
        }
    }
    /**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   * @override
   */ getResolutions(projection) {
        const tileGrid = projection ? this.getTileGridForProjection(projection) : this.tileGrid;
        if (!tileGrid) {
            return null;
        }
        return tileGrid.getResolutions();
    }
    /**
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {import("../structs/LRUCache.js").default<import("../Tile.js").default>} [tileCache] Tile cache.
   * @return {TileType|null} Tile.
   */ getTile(z, x, y, pixelRatio, projection, tileCache) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["abstract"])();
    }
    /**
   * Return the tile grid of the tile source.
   * @return {import("../tilegrid/TileGrid.js").default|null} Tile grid.
   * @api
   */ getTileGrid() {
        return this.tileGrid;
    }
    /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */ getTileGridForProjection(projection) {
        if (!this.tileGrid) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$tilegrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getForProjection"])(projection);
        }
        return this.tileGrid;
    }
    /**
   * Get the tile pixel ratio for this source. Subclasses may override this
   * method, which is meant to return a supported pixel ratio that matches the
   * provided `pixelRatio` as close as possible.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   */ getTilePixelRatio(pixelRatio) {
        return this.tilePixelRatio_;
    }
    /**
   * @param {number} z Z.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../size.js").Size} Tile size.
   */ getTilePixelSize(z, pixelRatio, projection) {
        const tileGrid = this.getTileGridForProjection(projection);
        const tilePixelRatio = this.getTilePixelRatio(pixelRatio);
        const tileSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSize"])(tileGrid.getTileSize(z), this.tmpSize);
        if (tilePixelRatio == 1) {
            return tileSize;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scale"])(tileSize, tilePixelRatio, this.tmpSize);
    }
    /**
   * Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
   * is outside the resolution and extent range of the tile grid, `null` will be
   * returned.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../proj/Projection.js").default} [projection] Projection.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
   *     null if no tile URL should be created for the passed `tileCoord`.
   */ getTileCoordForTileUrlFunction(tileCoord, projection) {
        const gridProjection = projection !== undefined ? projection : this.getProjection();
        const tileGrid = projection !== undefined ? this.getTileGridForProjection(gridProjection) : this.tileGrid || this.getTileGridForProjection(gridProjection);
        if (this.getWrapX() && gridProjection.isGlobal()) {
            tileCoord = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$tilegrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["wrapX"])(tileGrid, tileCoord, gridProjection);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$tilecoord$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withinExtentAndZ"])(tileCoord, tileGrid) ? tileCoord : null;
    }
    /**
   * Remove all cached reprojected tiles from the source. The next render cycle will create new tiles.
   * @api
   */ clear() {}
    /**
   * @override
   */ refresh() {
        this.clear();
        super.refresh();
    }
}
class TileSourceEvent extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$events$2f$Event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    /**
   * @param {string} type Type.
   * @param {import("../Tile.js").default} tile The tile.
   */ constructor(type, tile){
        super(type);
        /**
     * The tile related to the event.
     * @type {import("../Tile.js").default}
     * @api
     */ this.tile = tile;
    }
}
const __TURBOPACK__default__export__ = TileSource;
}),
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/TileEventType.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @module ol/source/TileEventType
 */ /**
 * @enum {string}
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    /**
   * Triggered when a tile starts loading.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadstart
   * @api
   */ TILELOADSTART: 'tileloadstart',
    /**
   * Triggered when a tile finishes loading, either when its data is loaded,
   * or when loading was aborted because the tile is no longer needed.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadend
   * @api
   */ TILELOADEND: 'tileloadend',
    /**
   * Triggered if tile loading results in an error. Note that this is not the
   * right place to re-fetch tiles. See {@link module:ol/ImageTile~ImageTile#load}
   * for details.
   * @event module:ol/source/Tile.TileSourceEvent#tileloaderror
   * @api
   */ TILELOADERROR: 'tileloaderror'
};
 /**
 * @typedef {'tileloadstart'|'tileloadend'|'tileloaderror'} TileSourceEventTypes
 */ }),
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/UrlTile.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
/**
 * @module ol/source/UrlTile
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$TileState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/TileState.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$tileurlfunction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/tileurlfunction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$uri$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/uri.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/util.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$Tile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/Tile.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$TileEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/TileEventType.js [app-client] (ecmascript)");
;
;
;
;
;
;
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Deprecated.  Use the cacheSize option on the layer instead.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {import("./Source.js").State} [state] State.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] TileGrid.
 * @property {import("../Tile.js").LoadFunction} tileLoadFunction TileLoadFunction.
 * @property {number} [tilePixelRatio] TilePixelRatio.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Deprecated.  Use an ImageTile source and provide a function
 * for the url option instead.
 * @property {string} [url] Url.
 * @property {Array<string>} [urls] Urls.
 * @property {boolean} [wrapX=true] WrapX.
 * @property {number} [transition] Transition.
 * @property {string} [key] Key.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0] ZDirection.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 */ /**
 * @deprecated Use the ol/source/ImageTile.js instead.
 *
 * @fires import("./Tile.js").TileSourceEvent
 */ class UrlTile extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$Tile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    /**
   * @param {Options} options Image tile options.
   */ constructor(options){
        super({
            attributions: options.attributions,
            cacheSize: options.cacheSize,
            projection: options.projection,
            state: options.state,
            tileGrid: options.tileGrid,
            tilePixelRatio: options.tilePixelRatio,
            wrapX: options.wrapX,
            transition: options.transition,
            interpolate: options.interpolate,
            key: options.key,
            attributionsCollapsible: options.attributionsCollapsible,
            zDirection: options.zDirection
        });
        /**
     * @private
     * @type {boolean}
     */ this.generateTileUrlFunction_ = this.tileUrlFunction === UrlTile.prototype.tileUrlFunction;
        /**
     * @protected
     * @type {import("../Tile.js").LoadFunction}
     */ this.tileLoadFunction = options.tileLoadFunction;
        if (options.tileUrlFunction) {
            this.tileUrlFunction = options.tileUrlFunction;
        }
        /**
     * @protected
     * @type {!Array<string>|null}
     */ this.urls = null;
        if (options.urls) {
            this.setUrls(options.urls);
        } else if (options.url) {
            this.setUrl(options.url);
        }
        /**
     * @private
     * @type {!Object<string, boolean>}
     */ this.tileLoadingKeys_ = {};
    }
    /**
   * Deprecated.  Use an ImageTile source instead.
   * Return the tile load function of the source.
   * @return {import("../Tile.js").LoadFunction} TileLoadFunction
   * @api
   */ getTileLoadFunction() {
        return this.tileLoadFunction;
    }
    /**
   * Deprecated.  Use an ImageTile source instead.
   * Return the tile URL function of the source.
   * @return {import("../Tile.js").UrlFunction} TileUrlFunction
   * @api
   */ getTileUrlFunction() {
        return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
    }
    /**
   * Deprecated.  Use an ImageTile source instead.
   * Return the URLs used for this source.
   * When a tileUrlFunction is used instead of url or urls,
   * null will be returned.
   * @return {!Array<string>|null} URLs.
   * @api
   */ getUrls() {
        return this.urls;
    }
    /**
   * Handle tile change events.
   * @param {import("../events/Event.js").default} event Event.
   * @protected
   */ handleTileChange(event) {
        const tile = event.target;
        const uid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUid"])(tile);
        const tileState = tile.getState();
        let type;
        if (tileState == __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$TileState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].LOADING) {
            this.tileLoadingKeys_[uid] = true;
            type = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$TileEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].TILELOADSTART;
        } else if (uid in this.tileLoadingKeys_) {
            delete this.tileLoadingKeys_[uid];
            type = tileState == __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$TileState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].ERROR ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$TileEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].TILELOADERROR : tileState == __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$TileState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].LOADED ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$TileEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].TILELOADEND : undefined;
        }
        if (type != undefined) {
            this.dispatchEvent(new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$Tile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TileSourceEvent"](type, tile));
        }
    }
    /**
   * Deprecated.  Use an ImageTile source instead.
   * Set the tile load function of the source.
   * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @api
   */ setTileLoadFunction(tileLoadFunction) {
        this.tileLoadFunction = tileLoadFunction;
        this.changed();
    }
    /**
   * Deprecated.  Use an ImageTile source instead.
   * Set the tile URL function of the source.
   * @param {import("../Tile.js").UrlFunction} tileUrlFunction Tile URL function.
   * @param {string} [key] Optional new tile key for the source.
   * @api
   */ setTileUrlFunction(tileUrlFunction, key) {
        this.tileUrlFunction = tileUrlFunction;
        if (typeof key !== 'undefined') {
            this.setKey(key);
        } else {
            this.changed();
        }
    }
    /**
   * Set the URL to use for requests.
   * @param {string} url URL.
   * @api
   */ setUrl(url) {
        const urls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$uri$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandUrl"])(url);
        this.urls = urls;
        this.setUrls(urls);
    }
    /**
   * Deprecated.  Use an ImageTile source instead.
   * Set the URLs to use for requests.
   * @param {Array<string>} urls URLs.
   * @api
   */ setUrls(urls) {
        this.urls = urls;
        const key = urls.join('\n');
        if (this.generateTileUrlFunction_) {
            this.setTileUrlFunction((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$tileurlfunction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createFromTemplates"])(urls, this.tileGrid), key);
        } else {
            this.setKey(key);
        }
    }
    /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {string|undefined} Tile URL.
   */ tileUrlFunction(tileCoord, pixelRatio, projection) {
        return undefined;
    }
}
const __TURBOPACK__default__export__ = UrlTile;
}),
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/TileImage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "defaultTileLoadFunction",
    ()=>defaultTileLoadFunction
]);
/**
 * @module ol/source/TileImage
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$ImageTile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/ImageTile.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$TileState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/TileState.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$events$2f$EventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/events/EventType.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$has$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/has.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/proj.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$reproj$2f$Tile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/reproj/Tile.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$tilecoord$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/tilecoord.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$tilegrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/tilegrid.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/util.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$UrlTile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/UrlTile.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Deprecated.  Use the cacheSize option on the layer instead.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("./Source.js").State} [state] Source state.
 * @property {typeof import("../ImageTile.js").default} [tileClass] Class used to instantiate image tiles.
 * Default is {@link module:ol/ImageTile~ImageTile}.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service. For example, if the tile
 * service advertizes 256px by 256px tiles but actually sends 512px
 * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
 * should be set to `2`.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Deprecated.  Use an ImageTile source and provide a function
 * for the url option instead.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be
 * used instead of defining each one separately in the `urls` option.
 * @property {Array<string>} [urls] An array of URL templates.
 * @property {boolean} [wrapX] Whether to wrap the world horizontally. The default, is to
 * request out-of-bounds tiles from the server. When set to `false`, only one
 * world will be rendered. When set to `true`, tiles will be requested for one
 * world only, but they will be wrapped horizontally to render multiple worlds.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {string} [key] Optional tile key for proper cache fetching
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */ /**
 * @deprecated Use the ol/source/ImageTile.js instead.
 *
 * @fires import("./Tile.js").TileSourceEvent
 * @api
 */ class TileImage extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$UrlTile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    /**
   * @param {!Options} options Image tile options.
   */ constructor(options){
        super({
            attributions: options.attributions,
            cacheSize: options.cacheSize,
            projection: options.projection,
            state: options.state,
            tileGrid: options.tileGrid,
            tileLoadFunction: options.tileLoadFunction ? options.tileLoadFunction : defaultTileLoadFunction,
            tilePixelRatio: options.tilePixelRatio,
            tileUrlFunction: options.tileUrlFunction,
            url: options.url,
            urls: options.urls,
            wrapX: options.wrapX,
            transition: options.transition,
            interpolate: options.interpolate !== undefined ? options.interpolate : true,
            key: options.key,
            attributionsCollapsible: options.attributionsCollapsible,
            zDirection: options.zDirection
        });
        /**
     * @protected
     * @type {?string}
     */ this.crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : null;
        /**
     * @protected
     * @type {typeof ImageTile}
     */ this.tileClass = options.tileClass !== undefined ? options.tileClass : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$ImageTile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
        /**
     * @protected
     * @type {!Object<string, import("../tilegrid/TileGrid.js").default>}
     */ this.tileGridForProjection = {};
        /**
     * @private
     * @type {number|undefined}
     */ this.reprojectionErrorThreshold_ = options.reprojectionErrorThreshold;
        /**
     * @private
     * @type {boolean}
     */ this.renderReprojectionEdges_ = false;
    }
    /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   * @override
   */ getGutterForProjection(projection) {
        if (this.getProjection() && projection && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["equivalent"])(this.getProjection(), projection)) {
            return 0;
        }
        return this.getGutter();
    }
    /**
   * @return {number} Gutter.
   */ getGutter() {
        return 0;
    }
    /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   * @override
   */ getKey() {
        let key = super.getKey();
        if (!this.getInterpolate()) {
            key += ':disable-interpolation';
        }
        return key;
    }
    /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   * @override
   */ getTileGridForProjection(projection) {
        const thisProj = this.getProjection();
        if (this.tileGrid && (!thisProj || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["equivalent"])(thisProj, projection))) {
            return this.tileGrid;
        }
        const projKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUid"])(projection);
        if (!(projKey in this.tileGridForProjection)) {
            this.tileGridForProjection[projKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$tilegrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getForProjection"])(projection);
        }
        return this.tileGridForProjection[projKey];
    }
    /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {string} key The key set on the tile.
   * @return {!ImageTile} Tile.
   * @private
   */ createTile_(z, x, y, pixelRatio, projection, key) {
        const tileCoord = [
            z,
            x,
            y
        ];
        const urlTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
        const tileUrl = urlTileCoord ? this.tileUrlFunction(urlTileCoord, pixelRatio, projection) : undefined;
        const tile = new this.tileClass(tileCoord, tileUrl !== undefined ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$TileState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].IDLE : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$TileState$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].EMPTY, tileUrl !== undefined ? tileUrl : '', this.crossOrigin, this.tileLoadFunction, this.tileOptions);
        tile.key = key;
        tile.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$events$2f$EventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].CHANGE, this.handleTileChange.bind(this));
        return tile;
    }
    /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {import("../structs/LRUCache.js").default<import("../Tile.js").default>} [tileCache] Tile cache.
   * @return {!(ImageTile|ReprojTile)} Tile.
   * @override
   */ getTile(z, x, y, pixelRatio, projection, tileCache) {
        const sourceProjection = this.getProjection();
        if (!sourceProjection || !projection || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["equivalent"])(sourceProjection, projection)) {
            return this.getTileInternal(z, x, y, pixelRatio, sourceProjection || projection);
        }
        const tileCoord = [
            z,
            x,
            y
        ];
        const key = this.getKey();
        const sourceTileGrid = this.getTileGridForProjection(sourceProjection);
        const targetTileGrid = this.getTileGridForProjection(projection);
        const wrappedTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
        const tile = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$reproj$2f$Tile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](sourceProjection, sourceTileGrid, projection, targetTileGrid, tileCoord, wrappedTileCoord, this.getTilePixelRatio(pixelRatio), this.getGutter(), (z, x, y, pixelRatio)=>this.getTileInternal(z, x, y, pixelRatio, sourceProjection, tileCache), this.reprojectionErrorThreshold_, this.renderReprojectionEdges_, this.tileOptions);
        tile.key = key;
        return tile;
    }
    /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {!import("../proj/Projection.js").default} projection Projection.
   * @param {import("../structs/LRUCache.js").default<import("../Tile.js").default>} [tileCache] Tile cache.
   * @return {!ImageTile} Tile.
   * @protected
   */ getTileInternal(z, x, y, pixelRatio, projection, tileCache) {
        const key = this.getKey();
        const cacheKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$tilecoord$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCacheKey"])(this, key, z, x, y);
        if (tileCache && tileCache.containsKey(cacheKey)) {
            const tile = tileCache.get(cacheKey);
            return tile;
        }
        const tile = this.createTile_(z, x, y, pixelRatio, projection, key);
        tileCache?.set(cacheKey, tile);
        return tile;
    }
    /**
   * Sets whether to render reprojection edges or not (usually for debugging).
   * @param {boolean} render Render the edges.
   * @api
   */ setRenderReprojectionEdges(render) {
        if (this.renderReprojectionEdges_ == render) {
            return;
        }
        this.renderReprojectionEdges_ = render;
        this.changed();
    }
    /**
   * Sets the tile grid to use when reprojecting the tiles to the given
   * projection instead of the default tile grid for the projection.
   *
   * This can be useful when the default tile grid cannot be created
   * (e.g. projection has no extent defined) or
   * for optimization reasons (custom tile size, resolutions, ...).
   *
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
   * @api
   */ setTileGridForProjection(projection, tilegrid) {
        const proj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])(projection);
        if (proj) {
            const projKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUid"])(proj);
            if (!(projKey in this.tileGridForProjection)) {
                this.tileGridForProjection[projKey] = tilegrid;
            }
        }
    }
}
function defaultTileLoadFunction(imageTile, src) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$has$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORKER_OFFSCREEN_CANVAS"]) {
        // special treatment for offscreen canvas
        const crossOrigin = imageTile.getCrossOrigin();
        /** @type {RequestMode} */ let mode = 'same-origin';
        /** @type {RequestCredentials} */ let credentials = 'same-origin';
        if (crossOrigin === 'anonymous' || crossOrigin === '') {
            mode = 'cors';
            credentials = 'omit';
        } else if (crossOrigin === 'use-credentials') {
            mode = 'cors';
            credentials = 'include';
        }
        fetch(src, {
            mode,
            credentials
        }).then((response)=>{
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.blob();
        }).then((blob)=>{
            return createImageBitmap(blob);
        }).then((imageBitmap)=>{
            const canvas = imageTile.getImage();
            canvas.width = imageBitmap.width;
            canvas.height = imageBitmap.height;
            const ctx = /** @type {OffscreenCanvas} */ canvas.getContext('2d');
            ctx.drawImage(imageBitmap, 0, 0);
            imageBitmap.close?.();
            // mock the image 'load' event
            canvas.dispatchEvent(new Event('load'));
        }).catch(()=>{
            const canvas = imageTile.getImage();
            canvas.dispatchEvent(new Event('error'));
        });
        return;
    }
    /** @type {HTMLImageElement|HTMLVideoElement} */ imageTile.getImage().src = src;
}
const __TURBOPACK__default__export__ = TileImage;
}),
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/XYZ.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
/**
 * @module ol/source/XYZ
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$tilegrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/tilegrid.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$TileImage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/TileImage.js [app-client] (ecmascript)");
;
;
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Deprecated.  Use the cacheSize option on the layer instead.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {number} [maxZoom=42] Optional max zoom level. Not used if `tileGrid` is provided.
 * @property {number} [minZoom=0] Optional min zoom level. Not used if `tileGrid` is provided.
 * @property {number} [maxResolution] Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Deprecated.  Use an ImageTile source with a loader
 * instead.  Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service.
 * For example, if the tile service advertizes 256px by 256px tiles but actually sends 512px
 * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
 * should be set to `2`.
 * @property {number|import("../size.js").Size} [tileSize=[256, 256]] The tile size used by the tile service.
 * Not used if `tileGrid` is provided.
 * @property {number} [gutter=0] The size in pixels of the gutter around image tiles to ignore.
 * This allows artifacts of rendering at tile edges to be ignored.
 * Supported images should be wider and taller than the tile size by a value of `2 x gutter`.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Deprecated.  Use an ImageTile source and provide a function
 * for the url option instead.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`,
 * and `{z}` placeholders. A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`,
 * may be used instead of defining each one separately in the `urls` option.
 * @property {Array<string>} [urls] Deprecated.  Use an ImageTile source and provide an array of URLs for the
 * url option instead.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */ /**
 * @classdesc
 * Layer source for tile data with URLs in a set XYZ format that are
 * defined in a URL template. By default, this follows the widely-used
 * Google grid where `x` 0 and `y` 0 are in the top left. Grids like
 * TMS where `x` 0 and `y` 0 are in the bottom left can be used by
 * using the `{-y}` placeholder in the URL template, so long as the
 * source does not have a custom tile grid. In this case
 * a `tileUrlFunction` can be used, such as:
 * ```js
 *  tileUrlFunction: function(coordinate) {
 *    return 'http://mapserver.com/' + coordinate[0] + '/' +
 *      coordinate[1] + '/' + (-coordinate[2] - 1) + '.png';
 *  }
 * ```
 * @api
 */ class XYZ extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$TileImage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    /**
   * @param {Options} [options] XYZ options.
   */ constructor(options){
        options = options || {};
        const projection = options.projection !== undefined ? options.projection : 'EPSG:3857';
        const tileGrid = options.tileGrid !== undefined ? options.tileGrid : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$tilegrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createXYZ"])({
            extent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$tilegrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["extentFromProjection"])(projection),
            maxResolution: options.maxResolution,
            maxZoom: options.maxZoom,
            minZoom: options.minZoom,
            tileSize: options.tileSize
        });
        super({
            attributions: options.attributions,
            cacheSize: options.cacheSize,
            crossOrigin: options.crossOrigin,
            interpolate: options.interpolate,
            projection: projection,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            tileGrid: tileGrid,
            tileLoadFunction: options.tileLoadFunction,
            tilePixelRatio: options.tilePixelRatio,
            tileUrlFunction: options.tileUrlFunction,
            url: options.url,
            urls: options.urls,
            wrapX: options.wrapX !== undefined ? options.wrapX : true,
            transition: options.transition,
            attributionsCollapsible: options.attributionsCollapsible,
            zDirection: options.zDirection
        });
        /**
     * @private
     * @type {number}
     */ this.gutter_ = options.gutter !== undefined ? options.gutter : 0;
    }
    /**
   * @return {number} Gutter.
   * @override
   */ getGutter() {
        return this.gutter_;
    }
}
const __TURBOPACK__default__export__ = XYZ;
}),
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/OSM.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ATTRIBUTION",
    ()=>ATTRIBUTION,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/**
 * @module ol/source/OSM
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$has$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/has.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$TileImage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/TileImage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$XYZ$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/XYZ.js [app-client] (ecmascript)");
;
;
;
const ATTRIBUTION = '&#169; ' + '<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> ' + 'contributors.';
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [cacheSize] Deprecated.  Use the cacheSize option on the layer instead.
 * @property {null|string} [crossOrigin='anonymous'] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {number} [maxZoom=19] Max zoom.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {string} [url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'] URL template.
 * Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */ /**
 * @classdesc
 * Layer source for the OpenStreetMap tile server.
 * @api
 */ class OSM extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$XYZ$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    /**
   * @param {Options} [options] Open Street Map options.
   */ constructor(options){
        options = options || {};
        let attributions;
        if (options.attributions !== undefined) {
            attributions = options.attributions;
        } else {
            attributions = [
                ATTRIBUTION
            ];
        }
        const crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';
        const url = options.url !== undefined ? options.url : 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
        super({
            attributions: attributions,
            attributionsCollapsible: false,
            cacheSize: options.cacheSize,
            crossOrigin: crossOrigin,
            interpolate: options.interpolate,
            maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            tileLoadFunction: /**
         * @param {import("../ImageTile.js").default} tile Image tile
         * @param {string} src Image src
         */ (tile, src)=>{
                const image = tile.getImage();
                // FIXME referrer policy for worker fetch requests
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$has$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORKER_OFFSCREEN_CANVAS"] && image instanceof HTMLImageElement) {
                    image.referrerPolicy = 'origin-when-cross-origin';
                }
                (options.tileLoadFunction || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$TileImage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultTileLoadFunction"])(tile, src);
            },
            transition: options.transition,
            url: url,
            wrapX: options.wrapX,
            zDirection: options.zDirection
        });
    }
}
const __TURBOPACK__default__export__ = OSM;
}),
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/VectorEventType.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @module ol/source/VectorEventType
 */ /**
 * @enum {string}
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    /**
   * Triggered when a feature is added to the source.
   * @event module:ol/source/Vector.VectorSourceEvent#addfeature
   * @api
   */ ADDFEATURE: 'addfeature',
    /**
   * Triggered when a feature is updated.
   * @event module:ol/source/Vector.VectorSourceEvent#changefeature
   * @api
   */ CHANGEFEATURE: 'changefeature',
    /**
   * Triggered when the clear method is called on the source.
   * @event module:ol/source/Vector.VectorSourceEvent#clear
   * @api
   */ CLEAR: 'clear',
    /**
   * Triggered when a feature is removed from the source.
   * See {@link module:ol/source/Vector~VectorSource#clear source.clear()} for exceptions.
   * @event module:ol/source/Vector.VectorSourceEvent#removefeature
   * @api
   */ REMOVEFEATURE: 'removefeature',
    /**
   * Triggered when features starts loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadstart
   * @api
   */ FEATURESLOADSTART: 'featuresloadstart',
    /**
   * Triggered when features finishes loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadend
   * @api
   */ FEATURESLOADEND: 'featuresloadend',
    /**
   * Triggered if feature loading results in an error.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloaderror
   * @api
   */ FEATURESLOADERROR: 'featuresloaderror'
};
 /**
 * @typedef {'addfeature'|'changefeature'|'clear'|'removefeature'|'featuresloadstart'|'featuresloadend'|'featuresloaderror'} VectorSourceEventTypes
 */ }),
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/Vector.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VectorSourceEvent",
    ()=>VectorSourceEvent,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/**
 * @module ol/source/Vector
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$Collection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/Collection.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$CollectionEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/CollectionEventType.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$ObjectEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/ObjectEventType.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$asserts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/asserts.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$events$2f$Event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/events/Event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$events$2f$EventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/events/EventType.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$extent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/extent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$featureloader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/featureloader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/functions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$loadingstrategy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/loadingstrategy.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$obj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/obj.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$render$2f$Feature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/render/Feature.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$structs$2f$RBush$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/structs/RBush.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/util.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$Source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/Source.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$VectorEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/VectorEventType.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
class VectorSourceEvent extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$events$2f$Event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    /**
   * @param {string} type Type.
   * @param {FeatureType} [feature] Feature.
   * @param {Array<FeatureType>} [features] Features.
   */ constructor(type, feature, features){
        super(type);
        /**
     * The added or removed feature for the `ADDFEATURE` and `REMOVEFEATURE` events, `undefined` otherwise.
     * @type {FeatureType|undefined}
     * @api
     */ this.feature = feature;
        /**
     * The loaded features for the `FEATURESLOADED` event, `undefined` otherwise.
     * @type {Array<FeatureType>|undefined}
     * @api
     */ this.features = features;
    }
}
/***
 * @template {import("../Feature.js").FeatureLike} [T=import("../Feature.js").default]
 * @typedef {T extends RenderFeature ? T|Array<T> : T} FeatureClassOrArrayOfRenderFeatures
 */ /***
 * @template Return
 * @template {import("../Feature.js").FeatureLike} [FeatureType=import("../Feature.js").default]
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("./VectorEventType").VectorSourceEventTypes, VectorSourceEvent<FeatureType>, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     import("./VectorEventType").VectorSourceEventTypes, Return>} VectorSourceOnSignature
 */ /**
 * @template {import("../Feature.js").FeatureLike} [FeatureType=import("../Feature.js").default]
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {Array<FeatureType>|Collection<FeatureType>} [features]
 * Features. If provided as {@link module:ol/Collection~Collection}, the features in the source
 * and the collection will stay in sync.
 * @property {import("../format/Feature.js").default<FeatureType>} [format] The feature format used by the XHR
 * feature loader when `url` is set. Required if `url` is set, otherwise ignored.
 * @property {import("../featureloader.js").FeatureLoader<FeatureType>} [loader]
 * The loader function used to load features, from a remote source for example.
 * If this is not set and `url` is set, the source will create and use an XHR
 * feature loader. The `'featuresloadend'` and `'featuresloaderror'` events
 * will only fire if the `success` and `failure` callbacks are used.
 *
 * Example:
 *
 * ```js
 * import Vector from 'ol/source/Vector.js';
 * import GeoJSON from 'ol/format/GeoJSON.js';
 * import {bbox} from 'ol/loadingstrategy.js';
 *
 * const vectorSource = new Vector({
 *   format: new GeoJSON(),
 *   loader: function(extent, resolution, projection, success, failure) {
 *      const proj = projection.getCode();
 *      const url = 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
 *          'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
 *          'outputFormat=application/json&srsname=' + proj + '&' +
 *          'bbox=' + extent.join(',') + ',' + proj;
 *      const xhr = new XMLHttpRequest();
 *      xhr.open('GET', url);
 *      const onError = function() {
 *        vectorSource.removeLoadedExtent(extent);
 *        failure();
 *      }
 *      xhr.onerror = onError;
 *      xhr.onload = function() {
 *        if (xhr.status == 200) {
 *          const features = vectorSource.getFormat().readFeatures(xhr.responseText);
 *          vectorSource.addFeatures(features);
 *          success(features);
 *        } else {
 *          onError();
 *        }
 *      }
 *      xhr.send();
 *    },
 *    strategy: bbox,
 *  });
 * ```
 * @property {boolean} [overlaps=true] This source may have overlapping geometries.
 * Setting this to `false` (e.g. for sources with polygons that represent administrative
 * boundaries or TopoJSON sources) allows the renderer to optimise fill and
 * stroke operations.
 * @property {LoadingStrategy} [strategy] The loading strategy to use.
 * By default an {@link module:ol/loadingstrategy.all}
 * strategy is used, a one-off strategy which loads all features at once.
 * @property {string|import("../featureloader.js").FeatureUrlFunction} [url]
 * Setting this option instructs the source to load features using an XHR loader
 * (see {@link module:ol/featureloader.xhr}). Use a `string` and an
 * {@link module:ol/loadingstrategy.all} for a one-off download of all features from
 * the given URL. Use a {@link module:ol/featureloader~FeatureUrlFunction} to generate the url with
 * other loading strategies.
 * Requires `format` to be set as well.
 * When default XHR feature loader is provided, the features will
 * be transformed from the data projection to the view projection
 * during parsing. If your remote data source does not advertise its projection
 * properly, this transformation will be incorrect. For some formats, the
 * default projection (usually EPSG:4326) can be overridden by setting the
 * dataProjection constructor option on the format.
 * Note that if a source contains non-feature data, such as a GeoJSON geometry
 * or a KML NetworkLink, these will be ignored. Use a custom loader to load these.
 * @property {boolean} [useSpatialIndex=true]
 * By default, an RTree is used as spatial index. When features are removed and
 * added frequently, and the total number of features is low, setting this to
 * `false` may improve performance.
 *
 * Note that
 * {@link module:ol/source/Vector~VectorSource#getFeaturesInExtent},
 * {@link module:ol/source/Vector~VectorSource#getClosestFeatureToCoordinate} and
 * {@link module:ol/source/Vector~VectorSource#getExtent} cannot be used when `useSpatialIndex` is
 * set to `false`, and {@link module:ol/source/Vector~VectorSource#forEachFeatureInExtent} will loop
 * through all features.
 *
 * When set to `false`, the features will be maintained in an
 * {@link module:ol/Collection~Collection}, which can be retrieved through
 * {@link module:ol/source/Vector~VectorSource#getFeaturesCollection}.
 * @property {boolean} [wrapX=true] Wrap the world horizontally. For vector editing across the
 * -180° and 180° meridians to work properly, this should be set to `false`. The
 * resulting geometry coordinates will then exceed the world bounds.
 */ /**
 * @classdesc
 * Provides a source of features for vector layers. Vector features provided
 * by this source are suitable for editing. See {@link module:ol/source/VectorTile~VectorTile} for
 * vector data that is optimized for rendering.
 *
 * @fires VectorSourceEvent
 * @api
 * @template {import("../Feature.js").FeatureLike} [FeatureType=import("../Feature.js").default]
 */ class VectorSource extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$Source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    /**
   * @param {Options<FeatureType>} [options] Vector source options.
   */ constructor(options){
        options = options || {};
        super({
            attributions: options.attributions,
            interpolate: true,
            projection: undefined,
            state: 'ready',
            wrapX: options.wrapX !== undefined ? options.wrapX : true
        });
        /***
     * @type {VectorSourceOnSignature<import("../events").EventsKey, FeatureType>}
     */ this.on;
        /***
     * @type {VectorSourceOnSignature<import("../events").EventsKey, FeatureType>}
     */ this.once;
        /***
     * @type {VectorSourceOnSignature<void>}
     */ this.un;
        /**
     * @private
     * @type {import("../featureloader.js").FeatureLoader<import("../Feature.js").FeatureLike>}
     */ this.loader_ = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VOID"];
        /**
     * @private
     * @type {import("../format/Feature.js").default<FeatureType>|null}
     */ this.format_ = options.format || null;
        /**
     * @private
     * @type {boolean}
     */ this.overlaps_ = options.overlaps === undefined ? true : options.overlaps;
        /**
     * @private
     * @type {string|import("../featureloader.js").FeatureUrlFunction|undefined}
     */ this.url_ = options.url;
        if (options.loader !== undefined) {
            this.loader_ = options.loader;
        } else if (this.url_ !== undefined) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$asserts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(this.format_, '`format` must be set when `url` is set');
            // create a XHR feature loader for "url" and "format"
            this.loader_ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$featureloader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["xhr"])(this.url_, this.format_);
        }
        /**
     * @private
     * @type {LoadingStrategy}
     */ this.strategy_ = options.strategy !== undefined ? options.strategy : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$loadingstrategy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["all"];
        const useSpatialIndex = options.useSpatialIndex !== undefined ? options.useSpatialIndex : true;
        /**
     * @private
     * @type {RBush<FeatureType>}
     */ this.featuresRtree_ = useSpatialIndex ? new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$structs$2f$RBush$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]() : null;
        /**
     * @private
     * @type {RBush<{extent: import("../extent.js").Extent}>}
     */ this.loadedExtentsRtree_ = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$structs$2f$RBush$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
        /**
     * @type {number}
     * @private
     */ this.loadingExtentsCount_ = 0;
        /**
     * @private
     * @type {!Object<string, FeatureType>}
     */ this.nullGeometryFeatures_ = {};
        /**
     * A lookup of features by id (the return from feature.getId()).
     * @private
     * @type {!Object<string, import('../Feature.js').FeatureLike|Array<import('../Feature.js').FeatureLike>>}
     */ this.idIndex_ = {};
        /**
     * A lookup of features by uid (using getUid(feature)).
     * @private
     * @type {!Object<string, FeatureType>}
     */ this.uidIndex_ = {};
        /**
     * @private
     * @type {Object<string, Array<import("../events.js").EventsKey>>}
     */ this.featureChangeKeys_ = {};
        /**
     * @private
     * @type {Collection<FeatureType>|null}
     */ this.featuresCollection_ = null;
        /** @type {Collection<FeatureType>} */ let collection;
        /** @type {Array<FeatureType>} */ let features;
        if (Array.isArray(options.features)) {
            features = options.features;
        } else if (options.features) {
            collection = options.features;
            features = collection.getArray();
        }
        if (!useSpatialIndex && collection === undefined) {
            collection = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$Collection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](features);
        }
        if (features !== undefined) {
            this.addFeaturesInternal(features);
        }
        if (collection !== undefined) {
            this.bindFeaturesCollection_(collection);
        }
    }
    /**
   * Add a single feature to the source.  If you want to add a batch of features
   * at once, call {@link module:ol/source/Vector~VectorSource#addFeatures #addFeatures()}
   * instead. A feature will not be added to the source if feature with
   * the same id is already there. The reason for this behavior is to avoid
   * feature duplication when using bbox or tile loading strategies.
   * Note: this also applies if a {@link module:ol/Collection~Collection} is used for features,
   * meaning that if a feature with a duplicate id is added in the collection, it will
   * be removed from it right away.
   * @param {FeatureType} feature Feature to add.
   * @api
   */ addFeature(feature) {
        this.addFeatureInternal(feature);
        this.changed();
    }
    /**
   * Add a feature without firing a `change` event.
   * @param {FeatureType} feature Feature.
   * @protected
   */ addFeatureInternal(feature) {
        const featureKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUid"])(feature);
        if (!this.addToIndex_(featureKey, feature)) {
            if (this.featuresCollection_) {
                this.featuresCollection_.remove(feature);
            }
            return;
        }
        this.setupChangeEvents_(featureKey, feature);
        const geometry = feature.getGeometry();
        if (geometry) {
            const extent = geometry.getExtent();
            if (this.featuresRtree_) {
                this.featuresRtree_.insert(extent, feature);
            }
        } else {
            this.nullGeometryFeatures_[featureKey] = feature;
        }
        this.dispatchEvent(new VectorSourceEvent(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$VectorEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].ADDFEATURE, feature));
    }
    /**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {FeatureType} feature The feature.
   * @private
   */ setupChangeEvents_(featureKey, feature) {
        if (feature instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$render$2f$Feature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]) {
            return;
        }
        this.featureChangeKeys_[featureKey] = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listen"])(feature, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$events$2f$EventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].CHANGE, this.handleFeatureChange_, this),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listen"])(feature, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$ObjectEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].PROPERTYCHANGE, this.handleFeatureChange_, this)
        ];
    }
    /**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {FeatureType} feature The feature.
   * @return {boolean} The feature is "valid", in the sense that it is also a
   *     candidate for insertion into the Rtree.
   * @private
   */ addToIndex_(featureKey, feature) {
        let valid = true;
        if (feature.getId() !== undefined) {
            const id = String(feature.getId());
            if (!(id in this.idIndex_)) {
                this.idIndex_[id] = feature;
            } else if (feature instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$render$2f$Feature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]) {
                const indexedFeature = this.idIndex_[id];
                if (!(indexedFeature instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$render$2f$Feature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])) {
                    valid = false;
                } else if (!Array.isArray(indexedFeature)) {
                    this.idIndex_[id] = [
                        indexedFeature,
                        feature
                    ];
                } else {
                    indexedFeature.push(feature);
                }
            } else {
                valid = false;
            }
        }
        if (valid) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$asserts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(!(featureKey in this.uidIndex_), 'The passed `feature` was already added to the source');
            this.uidIndex_[featureKey] = feature;
        }
        return valid;
    }
    /**
   * Add a batch of features to the source.
   * @param {Array<FeatureType>} features Features to add.
   * @api
   */ addFeatures(features) {
        this.addFeaturesInternal(features);
        this.changed();
    }
    /**
   * Add features without firing a `change` event.
   * @param {Array<FeatureType>} features Features.
   * @protected
   */ addFeaturesInternal(features) {
        const extents = [];
        /** @type {Array<FeatureType>} */ const newFeatures = [];
        /** @type {Array<FeatureType>} */ const geometryFeatures = [];
        for(let i = 0, length = features.length; i < length; i++){
            const feature = features[i];
            const featureKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUid"])(feature);
            if (this.addToIndex_(featureKey, feature)) {
                newFeatures.push(feature);
            }
        }
        for(let i = 0, length = newFeatures.length; i < length; i++){
            const feature = newFeatures[i];
            const featureKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUid"])(feature);
            this.setupChangeEvents_(featureKey, feature);
            const geometry = feature.getGeometry();
            if (geometry) {
                const extent = geometry.getExtent();
                extents.push(extent);
                geometryFeatures.push(feature);
            } else {
                this.nullGeometryFeatures_[featureKey] = feature;
            }
        }
        if (this.featuresRtree_) {
            this.featuresRtree_.load(extents, geometryFeatures);
        }
        if (this.hasListener(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$VectorEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].ADDFEATURE)) {
            for(let i = 0, length = newFeatures.length; i < length; i++){
                this.dispatchEvent(new VectorSourceEvent(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$VectorEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].ADDFEATURE, newFeatures[i]));
            }
        }
    }
    /**
   * @param {!Collection<FeatureType>} collection Collection.
   * @private
   */ bindFeaturesCollection_(collection) {
        let modifyingCollection = false;
        this.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$VectorEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].ADDFEATURE, /**
       * @param {VectorSourceEvent<FeatureType>} evt The vector source event
       */ function(evt) {
            if (!modifyingCollection) {
                modifyingCollection = true;
                collection.push(evt.feature);
                modifyingCollection = false;
            }
        });
        this.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$VectorEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].REMOVEFEATURE, /**
       * @param {VectorSourceEvent<FeatureType>} evt The vector source event
       */ function(evt) {
            if (!modifyingCollection) {
                modifyingCollection = true;
                collection.remove(evt.feature);
                modifyingCollection = false;
            }
        });
        collection.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$CollectionEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].ADD, /**
       * @param {import("../Collection.js").CollectionEvent<FeatureType>} evt The collection event
       */ (evt)=>{
            if (!modifyingCollection) {
                modifyingCollection = true;
                this.addFeature(evt.element);
                modifyingCollection = false;
            }
        });
        collection.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$CollectionEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].REMOVE, /**
       * @param {import("../Collection.js").CollectionEvent<FeatureType>} evt The collection event
       */ (evt)=>{
            if (!modifyingCollection) {
                modifyingCollection = true;
                this.removeFeature(evt.element);
                modifyingCollection = false;
            }
        });
        this.featuresCollection_ = collection;
    }
    /**
   * Remove all features from the source.
   * @param {boolean} [fast] Skip dispatching of {@link module:ol/source/Vector.VectorSourceEvent#event:removefeature} events.
   * @api
   */ clear(fast) {
        if (fast) {
            for(const featureId in this.featureChangeKeys_){
                const keys = this.featureChangeKeys_[featureId];
                keys.forEach(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unlistenByKey"]);
            }
            if (!this.featuresCollection_) {
                this.featureChangeKeys_ = {};
                this.idIndex_ = {};
                this.uidIndex_ = {};
            }
        } else {
            if (this.featuresRtree_) {
                this.featuresRtree_.forEach((feature)=>{
                    this.removeFeatureInternal(feature);
                });
                for(const id in this.nullGeometryFeatures_){
                    this.removeFeatureInternal(this.nullGeometryFeatures_[id]);
                }
            }
        }
        if (this.featuresCollection_) {
            this.featuresCollection_.clear();
        }
        if (this.featuresRtree_) {
            this.featuresRtree_.clear();
        }
        this.nullGeometryFeatures_ = {};
        const clearEvent = new VectorSourceEvent(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$VectorEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].CLEAR);
        this.dispatchEvent(clearEvent);
        this.changed();
    }
    /**
   * Iterate through all features on the source, calling the provided callback
   * with each one.  If the callback returns any "truthy" value, iteration will
   * stop and the function will return the same value.
   * Note: this function only iterate through the feature that have a defined geometry.
   *
   * @param {function(FeatureType): T} callback Called with each feature
   *     on the source.  Return a truthy value to stop iteration.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */ forEachFeature(callback) {
        if (this.featuresRtree_) {
            return this.featuresRtree_.forEach(callback);
        }
        if (this.featuresCollection_) {
            this.featuresCollection_.forEach(callback);
        }
    }
    /**
   * Iterate through all features whose geometries contain the provided
   * coordinate, calling the callback with each feature.  If the callback returns
   * a "truthy" value, iteration will stop and the function will return the same
   * value.
   *
   * For {@link module:ol/render/Feature~RenderFeature} features, the callback will be
   * called for all features.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(FeatureType): T} callback Called with each feature
   *     whose goemetry contains the provided coordinate.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   */ forEachFeatureAtCoordinateDirect(coordinate, callback) {
        const extent = [
            coordinate[0],
            coordinate[1],
            coordinate[0],
            coordinate[1]
        ];
        return this.forEachFeatureInExtent(extent, function(feature) {
            const geometry = feature.getGeometry();
            if (geometry instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$render$2f$Feature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] || geometry.intersectsCoordinate(coordinate)) {
                return callback(feature);
            }
            return undefined;
        });
    }
    /**
   * Iterate through all features whose bounding box intersects the provided
   * extent (note that the feature's geometry may not intersect the extent),
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you are interested in features whose geometry intersects an extent, call
   * the {@link module:ol/source/Vector~VectorSource#forEachFeatureIntersectingExtent #forEachFeatureIntersectingExtent()} method instead.
   *
   * When `useSpatialIndex` is set to false, this method will loop through all
   * features, equivalent to {@link module:ol/source/Vector~VectorSource#forEachFeature #forEachFeature()}.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(FeatureType): T} callback Called with each feature
   *     whose bounding box intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */ forEachFeatureInExtent(extent, callback) {
        if (this.featuresRtree_) {
            return this.featuresRtree_.forEachInExtent(extent, callback);
        }
        if (this.featuresCollection_) {
            this.featuresCollection_.forEach(callback);
        }
    }
    /**
   * Iterate through all features whose geometry intersects the provided extent,
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you only want to test for bounding box intersection, call the
   * {@link module:ol/source/Vector~VectorSource#forEachFeatureInExtent #forEachFeatureInExtent()} method instead.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(FeatureType): T} callback Called with each feature
   *     whose geometry intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */ forEachFeatureIntersectingExtent(extent, callback) {
        return this.forEachFeatureInExtent(extent, /**
       * @param {FeatureType} feature Feature.
       * @return {T|undefined} The return value from the last call to the callback.
       */ function(feature) {
            const geometry = feature.getGeometry();
            if (geometry instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$render$2f$Feature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] || geometry.intersectsExtent(extent)) {
                const result = callback(feature);
                if (result) {
                    return result;
                }
            }
        });
    }
    /**
   * Get the features collection associated with this source. Will be `null`
   * unless the source was configured with `useSpatialIndex` set to `false`, or
   * with a {@link module:ol/Collection~Collection} as `features`.
   * @return {Collection<FeatureType>|null} The collection of features.
   * @api
   */ getFeaturesCollection() {
        return this.featuresCollection_;
    }
    /**
   * Get a snapshot of the features currently on the source in random order. The returned array
   * is a copy, the features are references to the features in the source.
   * @return {Array<FeatureType>} Features.
   * @api
   */ getFeatures() {
        let features;
        if (this.featuresCollection_) {
            features = this.featuresCollection_.getArray().slice(0);
        } else if (this.featuresRtree_) {
            features = this.featuresRtree_.getAll();
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$obj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmpty"])(this.nullGeometryFeatures_)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extend"])(features, Object.values(this.nullGeometryFeatures_));
            }
        }
        return features;
    }
    /**
   * Get all features whose geometry intersects the provided coordinate.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {Array<FeatureType>} Features.
   * @api
   */ getFeaturesAtCoordinate(coordinate) {
        /** @type {Array<FeatureType>} */ const features = [];
        this.forEachFeatureAtCoordinateDirect(coordinate, function(feature) {
            features.push(feature);
        });
        return features;
    }
    /**
   * Get all features whose bounding box intersects the provided extent.  Note that this returns an array of
   * all features intersecting the given extent in random order (so it may include
   * features whose geometries do not intersect the extent).
   *
   * When `useSpatialIndex` is set to false, this method will return all
   * features.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {import("../proj/Projection.js").default} [projection] Include features
   * where `extent` exceeds the x-axis bounds of `projection` and wraps around the world.
   * @return {Array<FeatureType>} Features.
   * @api
   */ getFeaturesInExtent(extent, projection) {
        if (this.featuresRtree_) {
            const multiWorld = projection && projection.canWrapX() && this.getWrapX();
            if (!multiWorld) {
                return this.featuresRtree_.getInExtent(extent);
            }
            const extents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$extent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapAndSliceX"])(extent, projection);
            return [].concat(...extents.map((anExtent)=>this.featuresRtree_.getInExtent(anExtent)));
        }
        if (this.featuresCollection_) {
            return this.featuresCollection_.getArray().slice(0);
        }
        return [];
    }
    /**
   * Get the closest feature to the provided coordinate.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false` and the features in this source are of type
   * {@link module:ol/Feature~Feature}.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(FeatureType):boolean} [filter] Feature filter function.
   *     The filter function will receive one argument, the {@link module:ol/Feature~Feature feature}
   *     and it should return a boolean value. By default, no filtering is made.
   * @return {FeatureType|null} Closest feature (or `null` if none found).
   * @api
   */ getClosestFeatureToCoordinate(coordinate, filter) {
        // Find the closest feature using branch and bound.  We start searching an
        // infinite extent, and find the distance from the first feature found.  This
        // becomes the closest feature.  We then compute a smaller extent which any
        // closer feature must intersect.  We continue searching with this smaller
        // extent, trying to find a closer feature.  Every time we find a closer
        // feature, we update the extent being searched so that any even closer
        // feature must intersect it.  We continue until we run out of features.
        const x = coordinate[0];
        const y = coordinate[1];
        let closestFeature = null;
        const closestPoint = [
            NaN,
            NaN
        ];
        let minSquaredDistance = Infinity;
        const extent = [
            -Infinity,
            -Infinity,
            Infinity,
            Infinity
        ];
        filter = filter ? filter : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRUE"];
        this.featuresRtree_.forEachInExtent(extent, /**
       * @param {FeatureType} feature Feature.
       */ function(feature) {
            if (filter(feature)) {
                const geometry = feature.getGeometry();
                const previousMinSquaredDistance = minSquaredDistance;
                minSquaredDistance = geometry instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$render$2f$Feature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] ? 0 : geometry.closestPointXY(x, y, closestPoint, minSquaredDistance);
                if (minSquaredDistance < previousMinSquaredDistance) {
                    closestFeature = feature;
                    // This is sneaky.  Reduce the extent that it is currently being
                    // searched while the R-Tree traversal using this same extent object
                    // is still in progress.  This is safe because the new extent is
                    // strictly contained by the old extent.
                    const minDistance = Math.sqrt(minSquaredDistance);
                    extent[0] = x - minDistance;
                    extent[1] = y - minDistance;
                    extent[2] = x + minDistance;
                    extent[3] = y + minDistance;
                }
            }
        });
        return closestFeature;
    }
    /**
   * Get the extent of the features currently in the source.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false`.
   * @param {import("../extent.js").Extent} [extent] Destination extent. If provided, no new extent
   *     will be created. Instead, that extent's coordinates will be overwritten.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */ getExtent(extent) {
        return this.featuresRtree_.getExtent(extent);
    }
    /**
   * Get a feature by its identifier (the value returned by feature.getId()). When `RenderFeature`s
   * are used, `getFeatureById()` can return an array of `RenderFeature`s. This allows for handling
   * of `GeometryCollection` geometries, where format readers create one `RenderFeature` per
   * `GeometryCollection` member.
   * Note that the index treats string and numeric identifiers as the same.  So
   * `source.getFeatureById(2)` will return a feature with id `'2'` or `2`.
   *
   * @param {string|number} id Feature identifier.
   * @return {FeatureClassOrArrayOfRenderFeatures<FeatureType>|null} The feature (or `null` if not found).
   * @api
   */ getFeatureById(id) {
        const feature = this.idIndex_[id.toString()];
        return feature !== undefined ? feature : null;
    }
    /**
   * Get a feature by its internal unique identifier (using `getUid`).
   *
   * @param {string} uid Feature identifier.
   * @return {FeatureType|null} The feature (or `null` if not found).
   */ getFeatureByUid(uid) {
        const feature = this.uidIndex_[uid];
        return feature !== undefined ? feature : null;
    }
    /**
   * Get the format associated with this source.
   *
   * @return {import("../format/Feature.js").default<FeatureType>|null}} The feature format.
   * @api
   */ getFormat() {
        return this.format_;
    }
    /**
   * @return {boolean} The source can have overlapping geometries.
   */ getOverlaps() {
        return this.overlaps_;
    }
    /**
   * Get the url associated with this source.
   *
   * @return {string|import("../featureloader.js").FeatureUrlFunction|undefined} The url.
   * @api
   */ getUrl() {
        return this.url_;
    }
    /**
   * @param {Event} event Event.
   * @private
   */ handleFeatureChange_(event) {
        const feature = event.target;
        const featureKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUid"])(feature);
        const geometry = feature.getGeometry();
        if (!geometry) {
            if (!(featureKey in this.nullGeometryFeatures_)) {
                if (this.featuresRtree_) {
                    this.featuresRtree_.remove(feature);
                }
                this.nullGeometryFeatures_[featureKey] = feature;
            }
        } else {
            const extent = geometry.getExtent();
            if (featureKey in this.nullGeometryFeatures_) {
                delete this.nullGeometryFeatures_[featureKey];
                if (this.featuresRtree_) {
                    this.featuresRtree_.insert(extent, feature);
                }
            } else {
                if (this.featuresRtree_) {
                    this.featuresRtree_.update(extent, feature);
                }
            }
        }
        const id = feature.getId();
        if (id !== undefined) {
            const sid = id.toString();
            if (this.idIndex_[sid] !== feature) {
                this.removeFromIdIndex_(feature);
                this.idIndex_[sid] = feature;
            }
        } else {
            this.removeFromIdIndex_(feature);
            this.uidIndex_[featureKey] = feature;
        }
        this.changed();
        this.dispatchEvent(new VectorSourceEvent(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$VectorEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].CHANGEFEATURE, feature));
    }
    /**
   * Returns true if the feature is contained within the source.
   * @param {FeatureType} feature Feature.
   * @return {boolean} Has feature.
   * @api
   */ hasFeature(feature) {
        const id = feature.getId();
        if (id !== undefined) {
            return id in this.idIndex_;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUid"])(feature) in this.uidIndex_;
    }
    /**
   * @return {boolean} Is empty.
   */ isEmpty() {
        if (this.featuresRtree_) {
            return this.featuresRtree_.isEmpty() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$obj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmpty"])(this.nullGeometryFeatures_);
        }
        if (this.featuresCollection_) {
            return this.featuresCollection_.getLength() === 0;
        }
        return true;
    }
    /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */ loadFeatures(extent, resolution, projection) {
        const loadedExtentsRtree = this.loadedExtentsRtree_;
        const extentsToLoad = this.strategy_(extent, resolution, projection);
        for(let i = 0, ii = extentsToLoad.length; i < ii; ++i){
            const extentToLoad = extentsToLoad[i];
            const alreadyLoaded = loadedExtentsRtree.forEachInExtent(extentToLoad, /**
         * @param {{extent: import("../extent.js").Extent}} object Object.
         * @return {boolean} Contains.
         */ function(object) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$extent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["containsExtent"])(object.extent, extentToLoad);
            });
            if (!alreadyLoaded) {
                ++this.loadingExtentsCount_;
                this.dispatchEvent(new VectorSourceEvent(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$VectorEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].FEATURESLOADSTART));
                this.loader_.call(this, extentToLoad, resolution, projection, /**
           * @param {Array<FeatureType>} features Loaded features
           */ (features)=>{
                    --this.loadingExtentsCount_;
                    this.dispatchEvent(new VectorSourceEvent(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$VectorEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].FEATURESLOADEND, undefined, features));
                }, ()=>{
                    --this.loadingExtentsCount_;
                    this.dispatchEvent(new VectorSourceEvent(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$VectorEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].FEATURESLOADERROR));
                });
                loadedExtentsRtree.insert(extentToLoad, {
                    extent: extentToLoad.slice()
                });
            }
        }
        this.loading = this.loader_.length < 4 ? false : this.loadingExtentsCount_ > 0;
    }
    /**
   * @override
   */ refresh() {
        this.clear(true);
        this.loadedExtentsRtree_.clear();
        super.refresh();
    }
    /**
   * Remove an extent from the list of loaded extents.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */ removeLoadedExtent(extent) {
        const loadedExtentsRtree = this.loadedExtentsRtree_;
        const obj = loadedExtentsRtree.forEachInExtent(extent, function(object) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$extent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equals"])(object.extent, extent)) {
                return object;
            }
        });
        if (obj) {
            loadedExtentsRtree.remove(obj);
        }
    }
    /**
   * Batch remove features from the source.  If you want to remove all features
   * at once, use the {@link module:ol/source/Vector~VectorSource#clear #clear()} method
   * instead.
   * @param {Array<FeatureType>} features Features to remove.
   * @api
   */ removeFeatures(features) {
        let removed = false;
        for(let i = 0, ii = features.length; i < ii; ++i){
            removed = this.removeFeatureInternal(features[i]) || removed;
        }
        if (removed) {
            this.changed();
        }
    }
    /**
   * Remove a single feature from the source. If you want to batch remove
   * features, use the {@link module:ol/source/Vector~VectorSource#removeFeatures #removeFeatures()} method
   * instead.
   * @param {FeatureType} feature Feature to remove.
   * @api
   */ removeFeature(feature) {
        if (!feature) {
            return;
        }
        const removed = this.removeFeatureInternal(feature);
        if (removed) {
            this.changed();
        }
    }
    /**
   * Remove feature without firing a `change` event.
   * @param {FeatureType} feature Feature.
   * @return {boolean} True if the feature was removed, false if it was not found.
   * @protected
   */ removeFeatureInternal(feature) {
        const featureKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUid"])(feature);
        if (!(featureKey in this.uidIndex_)) {
            return false;
        }
        if (featureKey in this.nullGeometryFeatures_) {
            delete this.nullGeometryFeatures_[featureKey];
        } else {
            if (this.featuresRtree_) {
                this.featuresRtree_.remove(feature);
            }
        }
        const featureChangeKeys = this.featureChangeKeys_[featureKey];
        featureChangeKeys?.forEach(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unlistenByKey"]);
        delete this.featureChangeKeys_[featureKey];
        const id = feature.getId();
        if (id !== undefined) {
            const idString = id.toString();
            const indexedFeature = this.idIndex_[idString];
            if (indexedFeature === feature) {
                delete this.idIndex_[idString];
            } else if (Array.isArray(indexedFeature)) {
                indexedFeature.splice(indexedFeature.indexOf(feature), 1);
                if (indexedFeature.length === 1) {
                    this.idIndex_[idString] = indexedFeature[0];
                }
            }
        }
        delete this.uidIndex_[featureKey];
        if (this.hasListener(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$VectorEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].REMOVEFEATURE)) {
            this.dispatchEvent(new VectorSourceEvent(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$VectorEventType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].REMOVEFEATURE, feature));
        }
        return true;
    }
    /**
   * Remove a feature from the id index.  Called internally when the feature id
   * may have changed.
   * @param {FeatureType} feature The feature.
   * @private
   */ removeFromIdIndex_(feature) {
        for(const id in this.idIndex_){
            if (this.idIndex_[id] === feature) {
                delete this.idIndex_[id];
                break;
            }
        }
    }
    /**
   * Set the new loader of the source. The next render cycle will use the
   * new loader.
   * @param {import("../featureloader.js").FeatureLoader} loader The loader to set.
   * @api
   */ setLoader(loader) {
        this.loader_ = loader;
    }
    /**
   * Points the source to a new url. The next render cycle will use the new url.
   * @param {string|import("../featureloader.js").FeatureUrlFunction} url Url.
   * @api
   */ setUrl(url) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$asserts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(this.format_, '`format` must be set when `url` is set');
        this.url_ = url;
        this.setLoader((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$featureloader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["xhr"])(url, this.format_));
    }
    /**
   * @param {boolean} overlaps The source can have overlapping geometries.
   */ setOverlaps(overlaps) {
        this.overlaps_ = overlaps;
        this.changed();
    }
}
const __TURBOPACK__default__export__ = VectorSource;
}),
]);

//# sourceMappingURL=39c63_ol_source_0099bb1f._.js.map